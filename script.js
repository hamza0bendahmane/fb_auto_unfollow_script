(async function unfollowAll() {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all friend list items that contain the 3-dots menu button
  const friendItems = document.querySelectorAll('[aria-label^="More options for"]');

  for (let i = 0; i < friendItems.length; i++) {
    try {
      console.log(`Processing item ${i + 1}/${friendItems.length}`);

      // Click on 3 dots menu
      friendItems[i].click();
      await delay(1000); // Wait for popup menu to appear

      // Find the "Unfollow" button (text can vary by language)
      const buttons = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const unfollowBtn = buttons.find(btn => btn.innerText.toLowerCase().includes('unfollow'));

      if (unfollowBtn) {
        unfollowBtn.click();
        console.log(`✅ Unfollowed item ${i + 1}`);
        await delay(2000); // Wait for confirmation
      } else {
        console.warn(`⚠️ No unfollow button found for item ${i + 1}`);
      }

      // Optional: close the menu if needed (not always necessary)
      document.body.click();
      await delay(1000);
    } catch (e) {
      console.error(`❌ Error on item ${i + 1}:`, e);
    }
  }

  console.log("🎉 Finished unfollowing all visible items.");
})();
