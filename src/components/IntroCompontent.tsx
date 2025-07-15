import Button from "./Button";
import { useState } from "react";
import { toast } from "sonner";
import { WalletComponent } from "./WalletComponent";

export const IntroCompontent = () => {
  const [toggleGenerate, setToggleGenerate] = useState(false);
  const [type, setType] = useState("");


  function changePage(text : string) {
    setToggleGenerate(true);
    setType(text);
    toast.success("Wallet selected! Please continue to generate.");
  }

  return (
    <div className="w-9/12 mx-auto mt-10">
      {!toggleGenerate ? (
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl capitalize font-black font-sans dark:text-gray-100 text-gray-900">
              Hey there! Welcome to Wallet Mka
            </h1>
            <p className="text-lg md:text-2xl font-semibold font-sans dark:text-gray-100 text-gray-900 capitalize">
              {" "}
              — your all-in-one crypto wallet that works across multiple
              blockchain networks.{" "}
            </p>
          </div>

          <div className="flex gap-3">
            <div onClick={() => changePage("solana")}>
              <Button text="Solana" />
            </div>
            <div onClick={() => changePage("ethereum")}>
              <Button text="Ethereum" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <WalletComponent type={type} />
        </div>
      )}
    </div>
  );
};
