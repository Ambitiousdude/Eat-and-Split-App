import { useState } from "react";

const initialFriends = [
  {
    // First Object
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    // Second Object
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    // Third Object
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    // We can use both and it will work.
    // setShowAddFriend(!showAddFriend);

    // Here we used a callback function to update the state to true
    setShowAddFriend((show) => !show);
  }
  //Function that adds new friend.
  function handleAddFriend(Newfriend) {
    setFriends((friends) => [...friends, Newfriend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill />}
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend Onfriend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ Onfriend }) {
  return (
    <li>
      <img src={Onfriend.image} alt={Onfriend.name} />
      <h3>{Onfriend.name}</h3>
      {Onfriend.balance < 0 && (
        <p className="red">
          Your {Onfriend.name} owes you {Math.abs(Onfriend.balance)}$
        </p>
      )}

      {Onfriend.balance > 0 && (
        <p className="green">
          You owe {Onfriend.name} {Math.abs(Onfriend.balance)}$
        </p>
      )}
      {Onfriend.balance === 0 && <p>You and {Onfriend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

// Form for adding friends
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?= ${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤝‍♀️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

// Form for taking bills
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH X </h2>
      <label>💰Bill value</label>
      <input type="text" />
      <label> 💳 Your expense</label>
      <input type="text" />
      <label>🧑🏼‍🤝‍🧑🏾 X's expenses</label>
      <input type="text" disabled />
      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
