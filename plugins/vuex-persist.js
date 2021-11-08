import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "index", // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
  }).plugin(store);
};
