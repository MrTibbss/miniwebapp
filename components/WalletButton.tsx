'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Wallet } from 'lucide-react'

export default function WalletButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleClick = () => {
    if (isConnected) {
      disconnect()
    } else {
      open()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-secondary text-white rounded-full transition-all active:scale-95 text-sm font-medium shadow-md"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">
        {isConnected && address ? truncateAddress(address) : 'Connect'}
      </span>
    </button>
  )
}
