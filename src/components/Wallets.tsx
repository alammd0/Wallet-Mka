import { useState } from "react";
import { generateMnemonic } from "bip39";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

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
  const [hidePrivateKey, setHidePrivateKey] = useState(-1);

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
      toast.success("Solana wallet created!");
      setInterchange(true);
    } else {
      // this ethereum wallet
      const seed = await mnemonicToSeed(mn.join(" "));
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      const newWallet = {
        publicKey: wallet.address,
        privateKey: privateKey,
      };
      console.log(newWallet);
      setCurrentIndex(currentIndex + 1);
      setEthereumWallets((prev) => (prev ? [...prev, newWallet] : [newWallet]));
      toast.success("Ethereum wallet created!");
      setInterchange(true);
    }
  }

  const resetWallet = () => {
    setInterchange(false);
    setSolanaWallets([]);
    setEthereumWallets([]);
    toast.success("Wallet reset!");
  };

  const deleteWallet = (index: number) => {
    if (type === "solana") {
      setSolanaWallets((prev) => prev.filter((_, i) => i !== index));
      toast.success(`Solana wallet deleted! ${index}`);
    } else {
      setEthereumWallets((prev) => prev.filter((_, i) => i !== index));
      toast.success(`Ethereum wallet deleted! ${index}`);
    }
  };

  const copyToClipboard = () => {
    const mnemonicString = mnemonics.join(" ");
    navigator.clipboard.writeText(mnemonicString);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      <div className="">
        {!interchange ? (
          <button
            className="bg-[#15161a] cursor-pointer dark:hover:bg-[#15161a]/30 hover:bg-[#15161a]/30 transition duration-200 ease-in-out capitalize mt-10 dark:bg-white/20 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg border dark:border-primary/10 border-r-pink-50 rounded-2xl px-6 py-3 text-xl font-semibold font-sans"
            onClick={createWallet}
          >
            Create {type} Wallet
          </button>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl dark">
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
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
                <button
                  onClick={copyToClipboard}
                  className="text-xl md:text-2xl capitalize font-sans text-gray-400 cursor-pointer hover:text-gray-200 transition-all duration-200"
                >
                  <FiCopy />
                </button>
              </div>

              <div>
                {openmn ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-5 text-center">
                    {mnemonics.map((item, index) => (
                      <p
                        className="bg-[#15161a] dark:hover:bg-[#15161a]/30 hover:bg-[#15161a]/30 transition duration-200 ease-in-out p-4 rounded-2xl md:text-xl text-[16px] font-semibold text-white cursor-pointer"
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
                <div className="flex justify-between md:flex-row flex-col md:items-center gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl capitalize font-sans dark:text-gray-100 text-gray-900 font-medium">
                      This is solana wallet
                    </h1>
                  </div>

                  <div className="flex md:flex-row flex-col gap-3">
                    <button
                      className="dark:bg-white/20 bg-gray-800 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2  font-sans rounded-xl cursor-pointer"
                      onClick={createWallet}
                    >
                      Add Wallet
                    </button>
                    <button
                      className="dark:bg-red-700/50 dark:text-gray-100 text-white bg-red-700 shadow-lg backdrop-blur-lg px-3 py-2 font-sans rounded-xl cursor-pointer"
                      onClick={resetWallet}
                    >
                      Clear Wallets
                    </button>
                  </div>
                </div>

                <div>
                  {solanaWallets.map((item, index) => (
                    <div
                      className=" border-2 border-primary/10 mb-10 mt-8 rounded-2xl"
                      key={index}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-xl md:text-2xl capitalize dark:text-gray-100 text-gray-900 pt-2 pl-4 pb-3 font-sans">
                            Wallet: {index + 1}
                          </p>
                          <p
                            onClick={() => deleteWallet(index)}
                            className="text-xl md:text-2xl capitalize font-sans text-rose-700 cursor-pointer text-shadow-2xs hover:text-shadow-rose-800 transition-all duration-200 pt-2 pr-4 pb-3 "
                          >
                            <MdDelete />
                          </p>
                        </div>
                        <div className="dark:bg-[#15161a]/30 bg-gray-100 flex flex-col gap-4 shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl">
                          <div className="space-y-2">
                            <p className="dark:text-gray-100 text-gray-900">
                              Public Key
                            </p>
                            <p className="dark:text-gray-100 text-gray-900 md:text-[16px] text-[12px] dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3 break-all">
                              {item.publicKey}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="dark:text-gray-100 text-gray-900">
                              Private Key
                            </p>
                            <div className="flex items-center gap-2 relative">
                              <p className="dark:text-gray-100 text-gray-900 md:text-[16px] text-[12px] dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3 w-full break-all">
                                {hidePrivateKey === index
                                  ? item.privateKey
                                  : "****************************************************"}
                              </p>
                              <div className="absolute right-4 top-8 text-rose-200">
                                {hidePrivateKey === index ? (
                                  <FaRegEyeSlash
                                    className="cursor-pointer text-2xl"
                                    onClick={() => setHidePrivateKey(-1)}
                                  />
                                ) : (
                                  <FaRegEye
                                    className="cursor-pointer text-2xl"
                                    onClick={() => setHidePrivateKey(index)}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
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
                    <button
                      className="dark:bg-white/20 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2  font-sans rounded-xl bg-white cursor-pointer"
                      onClick={createWallet}
                    >
                      Add Wallet
                    </button>
                    <button
                      className="dark:bg-red-700/50 dark:text-gray-100 text-white shadow-lg backdrop-blur-lg px-3 py-2 font-sans rounded-xl bg-white cursor-pointer"
                      onClick={resetWallet}
                    >
                      Clear Wallets
                    </button>
                  </div>
                </div>

                <div>
                  {ethereumWallets.map((item, index) => (
                    <div
                      className=" border-2 border-primary/10 mb-10 mt-8 rounded-2xl"
                      key={index}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-xl md:text-2xl capitalize font-sans dark:text-gray-100 text-gray-900 pt-2 pl-4 pb-3">
                            Wallet {index + 1}
                          </p>
                          <p
                            onClick={() => deleteWallet(index)}
                            className="text-xl md:text-2xl capitalize font-sans text-rose-700 cursor-pointer text-shadow-2xs hover:text-shadow-rose-800 transition-all duration-200 pt-2 pr-4 pb-3 "
                          >
                            <MdDelete />
                          </p>
                        </div>

                        <div className="dark:bg-[#15161a]/30 bg-gray-100 flex flex-col gap-4 shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl">
                          <div className="space-y-2">
                            <p className="dark:text-gray-100 text-gray-900">
                              Public Key
                            </p>
                            <p className="dark:text-gray-100 text-gray-900 md:text-[16px] text-[12px] dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3 break-all">
                              {item.publicKey}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="dark:text-gray-100 text-gray-900">
                              Private Key
                            </p>
                            <div className="flex items-center gap-2 relative">
                              <p className="dark:text-gray-100 text-gray-900 md:text-[16px] text-[12px] dark:bg-[#15161a]/30 bg-gray-100 shadow-lg backdrop-blur-lg p-4 rounded-2xl mt-3 w-full break-all">
                                {hidePrivateKey === index
                                  ? item.privateKey
                                  : "****************************************************"}
                              </p>
                              <div className="absolute right-4 top-8 text-rose-200">
                                {hidePrivateKey === index ? (
                                  <FaRegEyeSlash
                                    className="cursor-pointer text-2xl"
                                    onClick={() => setHidePrivateKey(-1)}
                                  />
                                ) : (
                                  <FaRegEye
                                    className="cursor-pointer text-2xl"
                                    onClick={() => setHidePrivateKey(index)}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
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
