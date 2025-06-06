'use client';
import React, { useState, useEffect } from 'react';
import WalletConnection from '../component/WalletConnection';
import { useFortuneProgram } from '../hooks/useFortuneProgram';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, SystemProgram } from '@solana/web3.js';

const Home = () => {
  const { publicKey } = useWallet();
  const program = useFortuneProgram();
  const [fortune, setFortune] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fortuneAccount, setFortuneAccount] = useState<PublicKey | null>(null);

  // Add debug logs
  useEffect(() => {
    console.log('Wallet public key:', publicKey?.toString());
    console.log('Program instance:', program);
  }, [publicKey, program]);

  // Find the PDA for the user's fortune account
  const findFortuneAccount = async () => {
    if (!publicKey || !program) return null;
    
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("fortune"), publicKey.toBuffer()],
      program.programId
    );
    return pda;
  };

  // Check if the account exists and get current fortune
  useEffect(() => {
    const checkAccount = async () => {
      if (!publicKey || !program) return;
      
      const account = await findFortuneAccount();
      if (!account) return;

      try {
        const accountInfo = await program.account.fortuneAccount.fetch(account);
        setFortuneAccount(account);
        if (accountInfo.fortune !== "No fortune yet.") {
          setFortune(String(accountInfo.fortune));
        }
      } catch (e) {
        console.log('Account not initialized yet');
        setFortuneAccount(account);
      }
    };

    checkAccount();
  }, [publicKey, program]);

  const crackCookie = async () => {
    if (!program || !publicKey || !fortuneAccount) {
      alert('Wallet not connected or program not initialized');
      return;
    }

    try {
      setIsLoading(true);
      const tx = await program.methods
        .crackCookie()
        .accounts({
          fortuneAccount: fortuneAccount,
          user: publicKey,
        })
        .rpc();
      
      // Fetch the updated fortune
      const accountInfo = await program.account.fortuneAccount.fetch(fortuneAccount);
      setFortune(String(accountInfo.fortune));
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error && error.message.includes('Account does not exist')) {
        // If account doesn't exist, try to initialize it
        try {
          const tx = await program.methods
            .initialize()
            .accounts({
              fortuneAccount: fortuneAccount,
              user: publicKey,
              systemProgram: SystemProgram.programId,
            })
            .rpc();
          
          // After initialization, try cracking the cookie again
          const crackTx = await program.methods
            .crackCookie()
            .accounts({
              fortuneAccount: fortuneAccount,
              user: publicKey,
            })
            .rpc();
          
          const accountInfo = await program.account.fortuneAccount.fetch(fortuneAccount);
          setFortune(String(accountInfo.fortune));
        } catch (initError) {
          console.error('Initialization error:', initError);
          setFortune('❌ Error initializing account: ' + (initError instanceof Error ? initError.message : String(initError)));
        }
      } else {
        setFortune('❌ Error cracking fortune: ' + (error instanceof Error ? error.message : String(error)));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletConnection>
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-purple-600 mb-4">
              Solana Fortune Cookie
            </h1>
            <p className="text-gray-600 text-lg">
              Connect your wallet and discover your fortune on the Solana blockchain
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-center mb-8">
              <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-full !px-8 !py-3 !text-lg" />
            </div>

            {publicKey ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Connected Wallet:</p>
                  <p className="font-mono text-sm text-purple-600 break-all">
                    {publicKey.toString()}
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={crackCookie}
                    disabled={isLoading}
                    className={`
                      px-8 py-4 rounded-full text-lg font-semibold
                      ${isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all'
                      }
                      text-white shadow-lg
                    `}
                  >
                    {isLoading ? 'Cracking...' : '🍪 Crack a Fortune Cookie'}
                  </button>
                </div>

                {fortune && (
                  <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <p className="text-xl text-purple-800 font-medium">
                      {fortune}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">
                  Please connect your wallet to get started
                </p>
              </div>
            )}
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>Built on Solana Devnet</p>
          </div>
        </div>
      </div>
    </WalletConnection>
  );
};

export default Home;
