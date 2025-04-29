export interface User {
  user_id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Admin {
  admin_id: number;
  username: string;
}

export interface Team {
  team_id: number;
  team_name: string;
  coach: string;
  captain: string;
  logo?: string;
}

export interface Stadium {
  stadium_id: number;
  name: string;
  location: string;
  capacity: number;
  image?: string;
}

export interface Match {
  match_id: number;
  team1_id: number;
  team2_id: number;
  match_date: string;
  stadium_id: number;
  ticket_price: number;
  team1?: Team;
  team2?: Team;
  stadium?: Stadium;
}

export interface Seat {
  seat_id: number;
  stadium_id: number;
  match_id: number;
  seat_number: string;
  status: 'Available' | 'Booked';
}

export interface Ticket {
  ticket_id: number;
  user_id: number;
  match_id: number;
  seat_id: number;
  booking_date: string;
  status: 'Confirmed' | 'Cancelled';
  match?: Match;
  seat?: Seat;
}

export interface Payment {
  payment_id: number;
  user_id: number;
  ticket_id: number;
  amount: number;
  payment_status: 'Pending' | 'Completed' | 'Failed';
  payment_date: string;
}