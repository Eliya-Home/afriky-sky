const get = (key) => JSON.parse(localStorage.getItem(key)) || [];
const set = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

/* =========================
   BOOKINGS
========================= */
export const getBookings = () => get("bookings");

export const saveBooking = (booking) => {
  const data = get("bookings");
  data.push(booking);
  set("bookings", data);
};

/* =========================
   AIRLINES
========================= */
export const getAirlines = () => get("airlines");

export const saveAirlines = (airline) => {
  const data = get("airlines");
  data.push(airline);
  set("airlines", data);
};

/* =========================
   FLIGHTS
========================= */
export const getFlights = () => get("flights");

export const saveFlights = (flight) => {
  const data = get("flights");
  data.push(flight);
  set("flights", data);
};

/* =========================
   COMMISSIONS (5%)
========================= */
export const getCommissions = () => get("commissions");

export const generateCommission = (booking) => {
  const data = get("commissions");

  data.push({
    id: Date.now(),
    airlineId: booking.airlineId,
    amount: booking.price * 0.05,
    createdAt: new Date().toISOString(),
  });

  set("commissions", data);
};

/* =========================
   INVOICES (AUTO)
========================= */
export const getInvoices = () => get("invoices");

export const saveInvoice = (booking) => {
  const data = get("invoices");

  data.push({
    id: Date.now(),
    bookingId: booking.id,
    amount: booking.price,
    serviceFee: booking.price * 0.05,
    total: booking.price + booking.price * 0.05,
    createdAt: new Date().toISOString(),
  });

  set("invoices", data);
};

/* =========================
   WALLET (FIX ERROR)
========================= */
export const createWallet = (airlineId) => {
  const wallets = get("wallets");

  const wallet = {
    airlineId,
    balance: 0,
    createdAt: new Date().toISOString(),
  };

  wallets.push(wallet);
  set("wallets", wallets);

  return wallet;
};