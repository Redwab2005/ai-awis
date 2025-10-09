const cron = require("node-cron");
const User = require("../model/userModel");
const Email = require("../utils/Email");
function subscriptionChecker() {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running daily subscription expiration check...");

      // Find all users whose premium has expired
      const expiredUsers = await User.find({
        isPremium: true,
        premiumExpiresAt: { $lte: new Date() },
      });

      for (const user of expiredUsers) {
        user.isPremium = false;
        user.premiumPlan = undefined;
        user.paymentMethod = undefined;
        user.premiumPaymentDate = undefined;
        user.premiumExpiresAt = undefined;
        await user.save({ validateBeforeSave: false });

        try {
          await new Email(user).sendCancellationConfirmation({
            currentPeriodEnd: undefined,
          });
        } catch (e) {
          // Non-blocking email failure
        }
      }

      console.log(`✅ ${expiredUsers.length} subscriptions canceled.`);
    } catch (err) {
      console.error("❌ Error running cron job:", err);
    }
  });
}

module.exports = subscriptionChecker;
