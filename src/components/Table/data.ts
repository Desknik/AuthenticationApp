import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "USER", uid: "user", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "REGISTER DATE", uid: "registerdate"},
  {name: "GITHUB", uid: "github"},
  {name: "ACTIONS", uid: "actions"},
];


const users = [
  {
    id: 1,
    user: "Antony",
    github:"https://github.com/",
    email: "tony.reichert@example.com",
    registerdate: "06/23/2017",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    user: "Zoey Lang",
    role: "Tech Lead",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    user: "Jane Fisher",
    role: "Sr. Dev",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    user: "William Howard",
    role: "C.M.",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    user: "Kristen Copper",
    role: "S. Manager",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    user: "Brian Kim",
    role: "P. Manager",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
  },
  {
    id: 7,
    user: "Michael Hunt",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    user: "Samantha Brooks",
    role: "HR Manager",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    user: "Frank Harrison",
    role: "F. Manager",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    user: "Emma Adams",
    role: "Ops Manager",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    user: "Brandon Stevens",
    role: "Jr. Dev",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    user: "Megan Richards",
    role: "P. Manager",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    user: "Oliver Scott",
    role: "S. Manager",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    user: "Grace Allen",
    role: "M. Specialist",
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    user: "Noah Carter",
    role: "IT Specialist",
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    user: "Ava Perez",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    user: "Liam Johnson",
    role: "Data Analyst",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  }
];

export {columns, users};
