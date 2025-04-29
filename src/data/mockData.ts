import { Match, Team, Stadium, Seat } from '../types';
import { format, addDays } from 'date-fns';

// Mock Teams
export const teams: Team[] = [
  {
    team_id: 1,
    team_name: 'Mumbai Indians',
    coach: 'Mahela Jayawardene',
    captain: 'Rohit Sharma',
    logo: 'https://i.ibb.co/7NyPD0C/mi-logo.png'
  },
  {
    team_id: 2,
    team_name: 'Chennai Super Kings',
    coach: 'Stephen Fleming',
    captain: 'MS Dhoni',
    logo: 'https://i.ibb.co/hR5V7px/csk-logo.png'
  },
  {
    team_id: 3,
    team_name: 'Royal Challengers Bangalore',
    coach: 'Sanjay Bangar',
    captain: 'Virat Kohli',
    logo: 'https://i.ibb.co/m6yY8pS/rcb-logo.png'
  },
  {
    team_id: 4,
    team_name: 'Kolkata Knight Riders',
    coach: 'Brendon McCullum',
    captain: 'Shreyas Iyer',
    logo: 'https://i.ibb.co/ZGBzJYc/kkr-logo.png'
  },
  {
    team_id: 5,
    team_name: 'Delhi Capitals',
    coach: 'Ricky Ponting',
    captain: 'Rishabh Pant',
    logo: 'https://i.ibb.co/gWbvHmr/dc-logo.png'
  },
  {
    team_id: 6,
    team_name: 'Punjab Kings',
    coach: 'Anil Kumble',
    captain: 'KL Rahul',
    logo: 'https://i.ibb.co/3yN9X01/pk-logo.png'
  }
];

// Mock Stadiums
export const stadiums: Stadium[] = [
  {
    stadium_id: 1,
    name: 'Wankhede Stadium',
    location: 'Mumbai',
    capacity: 33000,
    image: 'https://images.pexels.com/photos/2098071/pexels-photo-2098071.jpeg'
  },
  {
    stadium_id: 2,
    name: 'M. A. Chidambaram Stadium',
    location: 'Chennai',
    capacity: 50000,
    image: 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg'
  },
  {
    stadium_id: 3,
    name: 'M. Chinnaswamy Stadium',
    location: 'Bangalore',
    capacity: 40000,
    image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg'
  },
  {
    stadium_id: 4,
    name: 'Eden Gardens',
    location: 'Kolkata',
    capacity: 66000,
    image: 'https://images.pexels.com/photos/128457/pexels-photo-128457.jpeg'
  }
];

// Generate upcoming dates
const today = new Date();
const generateDate = (daysToAdd: number) => {
  return format(addDays(today, daysToAdd), "yyyy-MM-dd'T'HH:mm:ss");
};

// Mock Matches
export const matches: Match[] = [
  {
    match_id: 1,
    team1_id: 1,
    team2_id: 2,
    match_date: generateDate(2),
    stadium_id: 1,
    ticket_price: 1500,
    team1: teams[0],
    team2: teams[1],
    stadium: stadiums[0]
  },
  {
    match_id: 2,
    team1_id: 3,
    team2_id: 4,
    match_date: generateDate(3),
    stadium_id: 3,
    ticket_price: 1800,
    team1: teams[2],
    team2: teams[3],
    stadium: stadiums[2]
  },
  {
    match_id: 3,
    team1_id: 5,
    team2_id: 6,
    match_date: generateDate(4),
    stadium_id: 4,
    ticket_price: 1200,
    team1: teams[4],
    team2: teams[5],
    stadium: stadiums[3]
  },
  {
    match_id: 4,
    team1_id: 1,
    team2_id: 3,
    match_date: generateDate(6),
    stadium_id: 1,
    ticket_price: 2000,
    team1: teams[0],
    team2: teams[2],
    stadium: stadiums[0]
  },
  {
    match_id: 5,
    team1_id: 2,
    team2_id: 4,
    match_date: generateDate(8),
    stadium_id: 2,
    ticket_price: 1700,
    team1: teams[1],
    team2: teams[3],
    stadium: stadiums[1]
  },
  {
    match_id: 6,
    team1_id: 5,
    team2_id: 1,
    match_date: generateDate(10),
    stadium_id: 4,
    ticket_price: 1900,
    team1: teams[4],
    team2: teams[0],
    stadium: stadiums[3]
  }
];

// Generate seat layout for a stadium
export const generateSeats = (match_id: number, stadium_id: number): Seat[] => {
  const seats: Seat[] = [];
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  // Generate 200 seats with row letters and numbers
  for (let row = 0; row < rowLetters.length; row++) {
    for (let seatNum = 1; seatNum <= 20; seatNum++) {
      const seat_id = row * 20 + seatNum;
      const seat_number = `${rowLetters[row]}${seatNum < 10 ? '0' : ''}${seatNum}`;
      
      // Randomly mark some seats as booked (for demo purposes)
      const status = Math.random() > 0.7 ? 'Booked' : 'Available';
      
      seats.push({
        seat_id,
        stadium_id,
        match_id,
        seat_number,
        status
      });
    }
  }
  
  return seats;
};