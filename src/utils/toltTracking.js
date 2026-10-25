const TOLT_READY_TIMEOUT_MS = 2000;

export async function getToltTracking() {
  if (typeof window === "undefined" || !window.tolt?.ready) {
    return null;
  }

  try {
    const tracking = await Promise.race([
      window.tolt.ready(),
      new Promise((resolve) =>
        setTimeout(() => resolve(null), TOLT_READY_TIMEOUT_MS)
      ),
    ]);
    return tracking || null;
  } catch (error) {
    console.error("Tolt tracking read failed:", error);
    return null;
  }
}

// Turns the stored partner click into a Tolt customer. Safe to call for every
// successful order: visitors without a referral are ignored by Tolt.
export async function signupToltCustomer(identifier) {
  if (!identifier || typeof window === "undefined" || !window.tolt?.signup) {
    return null;
  }

  try {
    const result = await window.tolt.signup(identifier);
    console.log("Tolt signup:", result);
    return result || null;
  } catch (error) {
    console.error("Tolt signup failed:", error);
    return null;
  }
}
