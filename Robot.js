const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",

  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

// looks like a lot, but let me explain
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    // return current state if we cannot go to destination from
    // our current address.
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((parcel) => {
          // this is where we do the moving
          // we iterate through all the parcels and see if they are where
          // we're currently at. Then we move them to our destination
          if (parcel.place !== this.place) return parcel;
          return { place: destination, address: parcel.address };
        })
        // here, we drop parcels off if they are addressed to our destinaiton
        // this is because parcel.place will be updated everytime we move
        .filter((parcel) => parcel.place !== parcel.address);
      return new VillageState(destination, parcels);
    }
  }
}
