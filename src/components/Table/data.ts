const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "USER", uid: "user", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "GITHUB", uid: "github"},
  {name: "ACTIONS", uid: "actions"},
];

const getUsersData = async () => {
  const req = await fetch('/api/users', {
    method: "GET",
    headers: {
        "Content-type": "application/json"
    },
})

  const res = await req.json()

  return res
}


export {columns, getUsersData};
