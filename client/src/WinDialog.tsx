import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { convertToUtf8 } from "./lib/utils";
import { workerClient } from "./worker-client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function WinDialog({ score }: { score: number }) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(0);

  const onSubmit = async () => {
    const usernameArray = convertToUtf8(username);
    await workerClient.updateScore({
      username: usernameArray,
      avatar,
      userId: 123, // should be udaated with signature
      score,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save on-chain</DialogTitle>
          <DialogDescription>Share your record on-chain</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label>Username</Label>
            <Input
              id="username"
              defaultValue="vitalik"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <Select
          onValueChange={(value) => setAvatar(Number(value))}
          defaultValue={"0"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Avatars</SelectLabel>
              <SelectItem value={"0"}>CrimsonRed</SelectItem>
              <SelectItem value={"1"}>ThunderYellow</SelectItem>
              <SelectItem value={"2"}>BlueOcean</SelectItem>
              <SelectItem value={"3"}>PurpleWine</SelectItem>
              <SelectItem value={"4"}>CitricOrange</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter className="sm:justify-start">
          <Button type="button" onClick={() => onSubmit()}>
            Submit
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
