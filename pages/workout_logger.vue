<script setup>
    // Scrpit to hide behind Login //
    definePageMeta({
        middleware: 'auth'
    })

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const loadWorkoutLogs = async () => {
      try {
        const { data: workoutLogData, error } = await supabase
          .from('workout_logs')
          .select('*')
          .eq('user_id', user.value.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching workout logs:', error.message);
          return;
        }

        if (workoutLogData) {
          workoutLogsArray.value = workoutLogData.map(workoutLog => ({
            id: workoutLog.id,
            created_at: workoutLog.created_at,
            workout_name: workoutLog.workout_name,
            notes: workoutLog.notes,
            street_park: workoutLog.street_park,
            workout_date: workoutLog.workout_date,
            satisfaction: workoutLog.satisfaction,
          }));
        }
      } catch (error) {
        console.error('Error fetching workout logs:', error.message);
      }
    };

</script>


<template>
    <div class="container-logs">
      <div class="left-column">
        <h2> Workouts </h2>
      </div>
      <div class="middle-column">
        <p class="title-text">Welcome to your personal program space</p>
      </div>
      <div class="right-column">
        <p> Placeholder right column e.g. Street Parks and Calendar </p>
      </div>
    </div>
  </template>