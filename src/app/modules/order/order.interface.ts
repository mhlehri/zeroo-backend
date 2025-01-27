export type TisConfirmed = "confirmed" | "unconfirmed" | "rejected";

export type TBooking = {
  room: string;
  slots: [string];
  user: string;
  totalAmount?: number;
  date: string;
  isConfirmed: TisConfirmed;
  isDeleted: boolean;
};
