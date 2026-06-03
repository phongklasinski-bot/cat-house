Component({
  properties: {
    title: String,
    subtitle: String,
    icon: String,
    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleTap() {
      if (this.data.disabled) {
        return;
      }
      this.triggerEvent('select');
    }
  }
});
