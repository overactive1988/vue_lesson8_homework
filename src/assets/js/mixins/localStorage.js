export default {
  methods: {
    saveLocalStorage(favorite) {
      const storageMethods = JSON.stringify(favorite);
      localStorage.setItem("Favorite", storageMethods);
    },
    getLocalStorage() {
      return JSON.parse(localStorage.getItem("Favorite"));
    },
    addMyFavorite(id) {
      if (this.myFavorite.includes(id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(id), 1);
      } else {
        this.myFavorite.push(id);
      }
      this.saveLocalStorage(this.myFavorite);
      this.emitter.emit("update-favorite");
    },
  },
};
