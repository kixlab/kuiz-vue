<template>
  <span>{{ dateFormatted }}</span>
</template>

<script>
export default {
  props: {
    date: { type: String, default: null },
  },

  data() {
    return {
      dateFormatted: "",
    };
  },

  created() {
    this.formatDate();
    setInterval(() => {
      this.formatDate();
    }, 5000);
  },

  beforeDestroy() {
    clearInterval(this.formatDate);
  },

  methods: {
    formatDate() {
      const createdAt = new Date(this.date);
      const now = new Date();

      // Get time difference between createdAt and now in minutes and remove decimal palces
      const diff = (now.getTime() - createdAt.getTime()) / 60000;
      const diffInt = Math.trunc(diff);

      // If the time difference exceeds one week (10080 minutes), the createdAt is displayed as "ddd dd at hh:mm AM/PM.
      // Else, it will be displayed as "N second/minutes/days ago".
      if (diffInt > 10080) {
        const dateStringArray = createdAt.toString().split(" ");
        const mmm = dateStringArray[1];
        const dd = dateStringArray[2];
        const HH = dateStringArray[4].substring(0, 2); // Hour in 24-hour format
        const hh = HH > 12 ? String(HH - 12) : HH; // Hour in 12-hour format
        const mm = dateStringArray[4].substring(3, 5);
        const period = HH > 11 ? "PM" : "AM";

        const exactDate =
          mmm + " " + dd + " at " + hh + ":" + mm + " " + period;

        this.dateFormatted = exactDate;
      } else {
        this.dateFormatted = this.$dayjs(this.date).fromNow();
      }
    },
  },
};
</script>

<style></style>
