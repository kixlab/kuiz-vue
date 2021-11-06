<script>
export default {
  asyncData({ redirect, params }) {
    return redirect("/" + params.courseCode + "/quizzes");
  },
};
</script>
