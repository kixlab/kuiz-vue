<script>
export default {
  asyncData({ store, params, redirect }) {
    if (params.courseCode !== null || params.courseCode !== undefined) {
      return redirect("/" + params.courseCode + "/quizzes");
    } else {
      return redirect("/" + store.state.currentCourse + "/quizzes");
    }
  },
};
</script>
