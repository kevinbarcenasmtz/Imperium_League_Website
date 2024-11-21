import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  TrophyIcon,
  CalendarDaysIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/diego_chase_photo.jpg";
import benefitTwoImg from "../../public/img/futsal_court.jpg";

const benefitOne = {
  title: "Affordable Pricing for All Teams",
  desc: "We believe soccer should be accessible to everyone. Our simple, transparent pricing ensures no hidden fees or surprises—just pure soccer enjoyment.",
  image: benefitOneImg, // Ensure the image corresponds to this feature or update it accordingly
  bullets: [
    {
      title: "Entry Fees",
      desc: "Price per team entry: $300. Everything is included for the entire season.",
      icon: <CurrencyDollarIcon />, // Use appropriate icons if needed
    },
    {
      title: "No Hidden Costs",
      desc: "No ID checks, no extra charges, no referee fees—just straightforward soccer fun.",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Hassle-Free Experience",
      desc: "From registration to game day, we make it simple and stress-free for your team.",
      icon: <ClipboardDocumentCheckIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Exciting Formats and Features",
  desc: "Our league stands out with unique features designed to maximize enjoyment, competitiveness, and affordability. From thrilling tournament formats to no hidden fees, we ensure every player has an unforgettable experience.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Champions League Format",
      desc: "Winners of each seasonal league compete in a grand Champions League during the summer for ultimate bragging rights.",
      icon: <TrophyIcon />,
    },
    {
      title: "Dynamic Scheduling",
      desc: "With four games per day and a well-paced schedule, participants can enjoy matches without overwhelming time commitments.",
      icon: <CalendarDaysIcon />,
    },
    {
      title: "No Hidden Fees",
      desc: "All-inclusive entry fees—no referee charges or ID checks—make it simple and affordable for teams to join and play.",
      icon: <BanknotesIcon />,
    },
  ],
};

export {benefitOne, benefitTwo};
