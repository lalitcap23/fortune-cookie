'use client'
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import idl from '../Anchor/idl.json';

import { PROGRAM_ID } from '../Anchor/programId';

export const useFortuneProgram = (): Program | null => {
  const wallet = useWallet();

  const connection = new web3.Connection('https://api.devnet.solana.com');

  const provider = useMemo(() => {
    if (!wallet || !wallet.publicKey) return null;

    const anchorWallet = wallet && wallet.publicKey && wallet.signTransaction && wallet.signAllTransactions
      ? {
          publicKey: wallet.publicKey,
          signTransaction: wallet.signTransaction,
          signAllTransactions: wallet.signAllTransactions,
        }
      : null;

    if (!anchorWallet) return null;

    return new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: 'processed',
    });
  }, [wallet, connection]);

  const program = useMemo(() => {
    if (!provider) return null;

    return new Program(idl as any, PROGRAM_ID, provider);
  }, [provider]);

  return program;
};
