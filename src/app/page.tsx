"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { PrivateKey } from "@aleohq/sdk";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAleoWASM } from "../aleo-wasm-hook";

function shortenString(str: string): string {
    if (str.length <= 8) {
      return str;
    }
    
    const firstPart = str.substring(0, 4);
    const lastPart = str.substring(str.length - 4);
    
    return `${firstPart}...${lastPart}`;
  }

export default function Home() {
  const { toast } = useToast();

  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [signingAccount, setSigningAccount] = useState<PrivateKey | null>(null);
  const [signingKey, setSigningKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const textEncoder = new TextEncoder();
  const [aleo] = useAleoWASM();

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: shortenString(text),
        action: <ToastAction altText="undo">Undo</ToastAction>,
      });
      setMessage("Copied to clipboard!");
    } catch (error) {
      setMessage("Copy failed.");
    }
  };

  const onKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSigningAccount(null);
    try {
      setSigningAccount(aleo.PrivateKey.from_string(event.target.value));
    } catch (error) {
      console.error(error);
    } finally {
      setSigningKey(null);
      setMessage(null);
    }
  };
  const signString = (str: string) => {
    if (str === "" || signingAccount === null) return;
    return signingAccount.sign(textEncoder.encode(str)).to_string();
  };
  const onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      alert("no message");
      return;
    }
    setMessage(event.target.value);

    try {
      setSigningKey(signString(event.target.value) || null);
    } catch (error) {
      console.error(error);
    }
  };

  const generateAccount = async () => {
    workerRef.current?.postMessage("key");
  };

  async function execute() {
    setExecuting(true);
    workerRef.current?.postMessage("execute");
  }

  const workerRef = useRef<Worker>();

  interface AleoWorkerMessageEvent {
    type: string;
    result: any;
  }

  useEffect(() => {
    workerRef.current = new Worker(new URL("worker.ts", import.meta.url));
    workerRef.current.onmessage = (
      event: MessageEvent<AleoWorkerMessageEvent>
    ) => {
      if (event.data.type === "key") {
        setAccount(event.data.result);
      } else if (event.data.type === "execute") {
        setExecuting(false);
      }
      alert(`WebWorker Response => ${event.data.result}`);
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage("execute");
  }, []);

  if (aleo !== null) {
    const signatureString = () => (signingKey !== null ? signingKey : "");
    const messageString = () => (message !== null ? message : "");

    return (
      <main>
        <Toaster />
        <div>
          <Input
            name="privateKey"
            placeholder="Private Key"
            onChange={onKeyChange}
          />
          <Input
            name="Message"
            placeholder="Message"
            value={messageString()}
            onChange={onMessageChange}
          />
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input placeholder="Signature" value={signatureString()} disabled />
            <Button onClick={() => copyToClipboard(signatureString())}>
              Copy
            </Button>
          </div>
        </div>

        <div>
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <Image
            src="/aleo.svg"
            alt="Next.js Logo"
            width={180}
            height={45}
            priority
          />
        </div>
        <div>
          <p>
            <Button onClick={generateAccount}>
              {account
                ? `Account is ${JSON.stringify(account)}`
                : `Click to generate account`}
            </Button>
          </p>
          <p>
            <Button disabled={executing} onClick={execute}>
              {executing
                ? `Executing...check console for details...`
                : `Execute helloworld.aleo`}
            </Button>
          </p>
        </div>
      </main>
    );
  } else {
    return (
      <h3>
        <center>Loading...</center>
      </h3>
    );
  }
}
