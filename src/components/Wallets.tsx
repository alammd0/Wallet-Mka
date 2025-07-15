import { useState } from "react";
import { generateMnemonic } from "bip39";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

export const Wallets = ({ type }: { type: string }) => {
  // Create a mnemonics state variable
  const [mnemonics, setMnemonics] = useState<string[]>([]);

  // solana and ethereum wallet including private key and public key
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solanaWallets, setSolanaWallets] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);

  const [ethereumWallets, setEthereumWallets] = useState<
    {
      publicKey: string;
      privateKey: string;
    }[]
  >([]);

  const [interchange, setInterchange] = useState(false);

  const [openmn, setOpenMn] = useState(false);

  async function createWallet() {
    console.log("createWallet");
    // 1. Generate Mnemonics
    let mn = mnemonics;
    if (!mn.length) {
      const mn = generateMnemonic();
      setMnemonics(mn.split(" "));
    }
    setInterchange(true);
    // 2. Check type of wallet and generate the wallet including private key and public key
    if (type === "solana") {
      // this solana wallet
      const seed = await mnemonicToSeed(mn.join(" "));
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(
        path,
        Buffer.from(seed).toString("hex")
      ).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      const newWallet = {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString("base64"),
      };
      setSolanaWallets((prev) => [...prev, newWallet]);
      setCurrentIndex(currentIndex + 1);
      setInterchange(true);
    } else {
      // this ethereum wallet
      const seed = await mnemonicToSeed(mn.join(" "));
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const publicKey = child.publicKey;
      const wallet = new Wallet(privateKey);
      const newWallet = {
        privateKey: wallet.address,
        publicKey: publicKey,
      };
      console.log(newWallet);
      setCurrentIndex(currentIndex + 1);
      setEthereumWallets((prev) => (prev ? [...prev, newWallet] : [newWallet]));
      setInterchange(true);
    }
  }

  const resetWallet = () => {
    setInterchange(false);
    setSolanaWallets([]);
    setEthereumWallets([]);
  };

  return (
    <div>
      <div className="">
        {!interchange ? (
          <button
            className="bg-[#15161a] capitalize mt-10 dark:bg-white/20 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg border dark:border-primary/10 border-r-pink-50 rounded-2xl px-6 py-3 text-xl font-semibold font-sans"
            onClick={createWallet}
          >
            Create {type} Wallet
          </button>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl dark">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenMn(!openmn)}
              >
                <h1 className="text-xl md:text-2xl capitalize font-sans dark:text-gray-100 text-gray-900 font-medium">
                  Your Secret Phrase
                </h1>
                {openmn ? (
                  <RiArrowDropUpLine className="text-4xl dark:text-gray-100 text-gray-900" />
                ) : (
                  <RiArrowDropDownLine className="text-4xl dark:text-gray-100 text-gray-900" />
                )}
              </div>

              <div>
                {openmn ? (
                  <div className="grid grid-cols-4 gap-4 m-5 text-center">
                    {mnemonics.map((item, index) => (
                      <p
                        className="bg-[#15161a] p-4 rounded-2xl text-xl font-semibold text-white cursor-pointer"
                        key={index}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* here create wallet */}
            {type === "solana" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-xl md:text-2xl capitalize font-sans dark:text-gray-100 text-gray-900 font-medium">
                      This is solana wallet
                    </h1>
                  </div>

                  <div className="flex gap-3">
                    <button  className="dark:bg-white/20 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2  font-sans rounded-xl bg-white cursor-pointer" onClick={createWallet}>
                      Add Wallet
                    </button>
                    <button className="dark:bg-red-700/50 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2 font-sans rounded-xl bg-white cursor-pointer" onClick={resetWallet}>Clear Wallets</button>
                  </div>
                </div>

                <div className="shadow-lg backdrop-blur-lg border border-primary/10 rounded-2xl dark">
                  {solanaWallets.map((item, index) => (
                    <div className="space-y-4" key={index}>
                      <p className="text-xl md:text-2xl capitalize font-sans dark:text-gray-100 text-gray-900 pt-2 pl-4 pb-3">Wallet: {index + 1}</p>
                      <div className="dark:bg-[#15161a]/30 bg-gray-100 flex flex-col gap-4 shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl">
                        <div className="space-y-2">
                          <p className="dark:text-gray-100 text-gray-900">Public Key</p>
                          <p className="dark:text-gray-100 text-gray-900 dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3">{item.publicKey}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="dark:text-gray-100 text-gray-900">Private Key</p>
                          <p className="dark:text-gray-100 text-gray-900 dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3">{item.privateKey}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl md:text-2xl capitalize font-sans p-1 dark:text-gray-100 text-gray-900 font-medium">
                    This is Ethereum wallet
                  </h1>
                  <div className="flex gap-3">
                    <button  className="dark:bg-white/20 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2  font-sans rounded-xl bg-white cursor-pointer" onClick={createWallet}>
                      Add Wallet
                    </button>
                    <button className="dark:bg-red-700/50 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2 font-sans rounded-xl bg-white cursor-pointer" onClick={resetWallet}>Clear Wallets</button>
                  </div>
                </div>

                <div className="shadow-lg backdrop-blur-lg border border-primary/10 rounded-2xl dark">
                  {ethereumWallets.map((item, index) => (
                    <div key={index}>
                      <p className="text-xl md:text-2xl capitalize font-sans dark:text-gray-100 text-gray-900 pt-2 pl-4 pb-3">Wallet {index + 1}</p>

                      <div className="dark:bg-[#15161a]/30 bg-gray-100 flex flex-col gap-4 shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl">
                        <div className="space-y-2">
                          <p className="dark:text-gray-100 text-gray-900">Public Key</p>
                          <p className="dark:text-gray-100 text-gray-900 dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3">{item.privateKey}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="dark:text-gray-100 text-gray-900">Private Key</p>
                          <p className="dark:text-gray-100 text-gray-900 dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3">{item.privateKey}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
