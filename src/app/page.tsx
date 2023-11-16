"use client";

import { Toaster } from "@/components/ui/toaster";
import { PrivateKey } from "@aleohq/sdk";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAleoWASM } from "../aleo-wasm-hook";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [signingAccount, setSigningAccount] = useState<PrivateKey | null>(null);
  const [signingKey, setSigningKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const textEncoder = new TextEncoder();
  const [aleo] = useAleoWASM();

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

  return (
    <main>
      <div>hello</div>
      <Toaster />

      <div>
        <input
          name="privateKey"
          placeholder="Private Key"
          onChange={onKeyChange}
        />
      </div>

      <div>
        <p>
          Get started by editing&nbsp;
          <code>src/app/page.tsx</code>
        </p>
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
          <button onClick={generateAccount}>
            {account
              ? `Account is ${JSON.stringify(account)}`
              : `Click to generate account`}
          </button>
        </p>
        <p>
          <button disabled={executing} onClick={execute}>
            {executing
              ? `Executing...check console for details...`
              : `Execute helloworld.aleo`}
          </button>
        </p>
      </div>
    </main>
  );
}
