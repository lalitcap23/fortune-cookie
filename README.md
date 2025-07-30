# 🧧 Solana Fortune Cookie

A fun decentralized application (dApp) built on Solana that gives you developer-themed fortune cookies! Connect your wallet and crack virtual fortune cookies to receive inspirational and humorous messages for developers.

## 🚀 Features

- **Wallet Integration**: Connect with Phantom, Solflare, and other Solana wallets
- **On-Chain Fortune Storage**: Your fortunes are permanently stored on the Solana blockchain
- **Developer-Themed Fortunes**: 17 carefully crafted fortunes with programming humor and inspiration
- **Program Derived Addresses (PDAs)**: Each user gets their own unique fortune account
- **Pseudo-Random Selection**: Uses Solana's clock for random fortune selection

## 🎯 How It Works

1. **Connect Your Wallet**: Use any Solana-compatible wallet
2. **Initialize Account**: First-time users automatically get a fortune account created
3. **Crack Fortune Cookies**: Click the button to get a new random fortune
4. **View Your Fortune**: Your latest fortune is displayed and stored on-chain

## 🛠 Technical Stack

### Smart Contract (Rust + Anchor)

- **Program ID**: `B2zffoELEriyBhJ4uALRLB8FkUCwBfetpbDhcvdYdPQC`
- **Framework**: Anchor Framework
- **Network**: Solana Devnet
- **Features**: PDAs, On-chain randomness, Account management

### Frontend (Next.js + TypeScript)

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Wallet Integration**: Solana Wallet Adapter
- **Web3 Library**: @solana/web3.js + @project-serum/anchor

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ and npm
- Rust and Cargo
- Solana CLI
- Anchor CLI
- A Solana wallet (Phantom recommended)

### Running the Project

1. **Clone and navigate to the project**:

   ```bash
   cd "fortune-cookie"
   ```

2. **Build the Solana program**:

   ```bash
   anchor build
   ```

3. **Deploy to devnet** (if needed):

   ```bash
   anchor deploy --provider.cluster devnet
   ```

4. **Install frontend dependencies**:

   ```bash
   cd frontend
   npm install
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🎮 Usage Instructions

1. **Connect Wallet**: Click "Connect Wallet" and choose your preferred wallet
2. **Get SOL**: Ensure you have some devnet SOL for transaction fees
   - Use the [Solana Faucet](https://faucet.solana.com/) for devnet SOL
3. **Crack Your First Cookie**: Click "🍪 Crack a Fortune Cookie"
4. **Enjoy Your Fortune**: Your personalized developer fortune will appear!
5. **Crack More**: Click again anytime for new fortunes

## 📋 Fortune Examples

- 🌈 "Today is your lucky day!"
- 🐉 "You're braver than you think—especially after deploying on a Friday."
- 👾 "Beware of bugs—those little love notes from Past You."
- 💡 "Innovation is your strength. Coffee is your sidekick."
- 📚 "Knowledge is the key to success. Also, read the README next time."

## 🔧 Development

### Program Structure

```rust
// Main functions
pub fn initialize(ctx: Context<Initialize>) -> Result<()>
pub fn crack_cookie(ctx: Context<CrackCookie>) -> Result<()>

// Account structure
pub struct FortuneAccount {
    pub user: Pubkey,    // Owner's wallet address
    pub fortune: String, // Current fortune message
}
```

### Frontend Structure

```
src/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # App layout
│   └── globals.css       # Global styles
├── component/
│   └── WalletConnection.tsx  # Wallet provider setup
├── hooks/
│   └── useFortuneProgram.ts  # Program interaction hook
└── Anchor/
    ├── idl.json          # Program interface definition
    └── programId.ts      # Program ID constant
```

## 🎨 Customization

### Adding New Fortunes

Edit the `fortunes` array in `programs/fortune-cookie/src/lib.rs`:

```rust
let fortunes = [
    "🌈 Today is your lucky day!",
    "🚀 Big gains are coming.",
    // Add your custom fortunes here...
];
```

### Styling

The UI uses Tailwind CSS. Modify styles in `frontend/src/app/page.tsx`.

## 🔒 Security Notes

- This is a demo application on devnet
- Never use real SOL for testing
- Always verify contract addresses
- The randomness is pseudo-random, not cryptographically secure

## 🐛 Troubleshooting

**Wallet Won't Connect**:

- Ensure you're on Solana devnet
- Check that your wallet has devnet SOL

**Transaction Fails**:

- Verify you have enough SOL for transaction fees
- Check if the program is deployed correctly

**Build Errors**:

- Ensure all dependencies are installed
- Check Rust and Anchor versions

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Anchor Framework](https://www.anchor-lang.com/)
- Solana blockchain
- Wallet Adapter libraries
- Next.js and Tailwind CSS

---

**Happy fortune hunting! 🍀**

_Remember: "Code is poetry, bugs are plot twists!"_ 🎭
