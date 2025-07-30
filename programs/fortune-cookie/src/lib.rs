use anchor_lang::prelude::*;

declare_id!("B2zffoELEriyBhJ4uALRLB8FkUCwBfetpbDhcvdYdPQC"); 

#[program]
pub mod fortune_realms {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.fortune_account;
        account.user = ctx.accounts.user.key();
        account.fortune = "No fortune yet.".to_string();
        Ok(())
    }

    pub fn crack_cookie(ctx: Context<CrackCookie>) -> Result<()> {
        let fortunes = [
            "🌈 Today is your lucky day!",
            "🚀 Big gains are coming.",
            "🧘‍♂️ Stay calm, success is near.",
            "🐉 You're braver than you think—especially after deploying on a Friday.",
            "👾 Beware of bugs—those little love notes from Past You.",
            "✨ A new idea will spark soon. Document it before it disappears.",
            "💡 Innovation is your strength. Coffee is your sidekick.",
            "🍕 Eat. Code. Ship. Brag. Repeat.",
            "🎉 Celebrate small wins. They compile into big ones.",
            "🌟 Shine bright like your monitor at 3AM.",
            "🧩 Every piece matters—especially the one you forgot to commit.",
            "🌍 Explore new horizons—yes, even outside your terminal.",
             "💪 Strength comes from within... and maybe from Stack Overflow.",
"           🎯 Focus on your goals. Close those 28 other tabs.",
           "🕵️‍♂️ Seek the truth. It's probably in the logs.",
           "🎨 Creativity is your superpower. Debugging is your battlefield .",
            "📚 Knowledge is the key to success. Also, read the README next time."
            

        ];

        let clock = Clock::get()?;
        let index = (clock.slot % fortunes.len() as u64) as usize;
        let fortune = fortunes[index];

        let account = &mut ctx.accounts.fortune_account;
        account.fortune = fortune.to_string();

        msg!("🧧 Fortune: {}", fortune);

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 280, 
        seeds = [b"fortune", user.key().as_ref()],
        bump
    )]
    pub fortune_account: Account<'info, FortuneAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CrackCookie<'info> {
    #[account(
        mut,
        seeds = [b"fortune", user.key().as_ref()],
        bump
    )]
    pub fortune_account: Account<'info, FortuneAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
}
#[account]
pub struct FortuneAccount {
    pub user: Pubkey,
    pub fortune: String,
}
