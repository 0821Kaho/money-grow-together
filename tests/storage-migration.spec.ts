
import { test, expect } from '@playwright/test';

test.describe('Storage Migration', () => {
  test('should clear localStorage when version mismatch detected', async ({ page }) => {
    // Set old version in localStorage before visiting the page
    await page.addInitScript(() => {
      localStorage.setItem('__pigipe_version__', '1');
      localStorage.setItem('old_progress_data', 'some old data');
      localStorage.setItem('progress-storage', JSON.stringify({
        completedModules: [1, 2],
        currentModule: 3,
        storyCompleted: true
      }));
    });

    // Visit the home page
    await page.goto('/');

    // Wait for the page to load and storage to be initialized
    await page.waitForTimeout(1000);

    // Check that localStorage was cleared and version updated
    const version = await page.evaluate(() => localStorage.getItem('__pigipe_version__'));
    expect(version).toBe('2');

    // Check that old data was cleared
    const oldData = await page.evaluate(() => localStorage.getItem('old_progress_data'));
    expect(oldData).toBeNull();

    // Check that progress was reset by looking for progress components
    // The progress should be at 0% or showing initial state
    const progressElements = await page.locator('[data-testid="module-progress"], .progress, [class*="progress"]').count();
    
    // If progress components exist, verify they show initial state
    if (progressElements > 0) {
      // Look for progress indicators that should show 0% or initial state
      const progressText = await page.locator('text=/0%|1\/5|モジュール 1/').count();
      expect(progressText).toBeGreaterThan(0);
    }
  });

  test('should preserve localStorage when version matches', async ({ page }) => {
    // Set current version and some data
    await page.addInitScript(() => {
      localStorage.setItem('__pigipe_version__', '2');
      localStorage.setItem('test_data', 'should be preserved');
    });

    // Visit the home page
    await page.goto('/');

    // Wait for the page to load
    await page.waitForTimeout(1000);

    // Check that version is still correct
    const version = await page.evaluate(() => localStorage.getItem('__pigipe_version__'));
    expect(version).toBe('2');

    // Check that data was preserved
    const testData = await page.evaluate(() => localStorage.getItem('test_data'));
    expect(testData).toBe('should be preserved');
  });

  test('debug page should show localStorage data and clear functionality', async ({ page }) => {
    // Set some test data
    await page.addInitScript(() => {
      localStorage.setItem('test_key_1', 'test_value_1');
      localStorage.setItem('test_key_2', 'test_value_2');
    });

    // Visit debug page
    await page.goto('/debug');

    // Check that localStorage data is displayed
    await expect(page.getByText('test_key_1')).toBeVisible();
    await expect(page.getByText('test_value_1')).toBeVisible();
    await expect(page.getByText('test_key_2')).toBeVisible();
    await expect(page.getByText('test_value_2')).toBeVisible();

    // Click clear localStorage button
    await page.getByRole('button', { name: 'Clear LocalStorage' }).click();

    // Page should reload, wait for it
    await page.waitForLoadState('networkidle');

    // Check that localStorage was cleared
    await expect(page.getByText('No localStorage data found')).toBeVisible();
  });
});
