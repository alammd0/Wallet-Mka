import { Wallets } from "./Wallets";

export const WalletComponent = ({ type }: { type: string }) => {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl capitalize font-black font-sans dark:text-gray-100 text-gray-900">
          Your Secret Phrase (Do Not Share)
        </h1>
        <p className="text-lg md:text-xl font-sans dark:text-gray-100 text-gray-900 capitalize">
          {" "}
          — This phrase gives full access to your wallet. Save it offline in a
          secure place.{" "}
        </p>
      </div>

      <div>
        <Wallets type={type} />
      </div>
    </div>
  );
};
