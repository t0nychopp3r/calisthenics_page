<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    // load data from DB
    const workoutLogsArray = ref([])

    const loadWorkoutLogs = async () => {
      try {

        console.log('Loading workout logs...');

        const { data: workoutLogData, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', user.value.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching workout logs:', error.message);
          return;
        }

        console.log('Workout log data fetched:', workoutLogData);

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
          console.log('Processed workout logs:', workoutLogsArray.value);
        }
      } catch (error) {
        console.error('Error fetching workout logs:', error.message);
      }
    };

    // fetch data
    loadWorkoutLogs()

    // input form
    const newWorkoutName = ref('')
    const newNotes = ref('')
    const newStreetPark = ref('')
    const newWorkoutDate = ref('')
    const newSatisfaction = ref('')

    // validate
    const validateWorkoutLog = () => {
      if (!newWorkoutName.value || !newWorkoutDate.value || !newSatisfaction.value) {
        alert('Please enter all required fields');
        return false;
      }
      return true;
    };

    // insert
    const addWorkoutLog = async () => {
      //get values
      console.log('Adding workout log...');
      const workout_name = newWorkoutName.value;
      const notes = newNotes.value;
      const street_park = newStreetPark.value;
      const workout_date = newWorkoutDate.value;
      const satisfaction = newSatisfaction.value;

      // validate
      if (!validateWorkoutLog()) {
        return;
      }
      console.log('Validated workout log...')
      try {
        console.log('Inserting workout log...');
        // insert into DB
        const { data, error } = await supabase
          .from('workouts')
          .insert([
            {
              user_id: user.value.id,
              workout_name: workout_name,
              notes: notes,
              street_park: street_park,
              workout_date: workout_date,
              satisfaction: satisfaction,
            },
          ]);

        if (error) {
          console.error('Error inserting workout log:', error.message);
          return;
        }

        console.log('Inserted workout log:', data);

        // reload data
        loadWorkoutLogs();
      } catch (error) {
        console.error('Error inserting workout log:', error.message);
      }

      // clear input fields
      newWorkoutName.value = '';
      newNotes.value = '';
      newStreetPark.value = '';
      newWorkoutDate.value = '';
      newSatisfaction.value = '';

    };

    // Update
    const updateWorkoutLog = async (id, workout_name, notes, street_park, workout_date, satisfaction) => {
      try {
        console.log('Updating workout log...');

        const { data, error } = await supabase
          .from('workouts')
          .update({ workout_name, notes, street_park, workout_date, satisfaction })
          .eq('id', id);

        if (error) {
          console.error('Error updating workout log:', error.message);
          return;
        }

        console.log('Updated workout log:', data);

        // reload data
        loadWorkoutLogs();
      } catch (error) {
        console.error('Error updating workout log:', error.message);
      }
    };

    // Delete
    const deleteWorkoutLog = async (id) => {
      try {
        console.log('Deleting workout log...');

        const { data, error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting workout log:', error.message);
          return;
        }

        console.log('Deleted workout log:', data);

        // reload data
        loadWorkoutLogs();
      } catch (error) {
        console.error('Error deleting workout log:', error.message);
      }
    };

    // format date
    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };
</script>


<template>
      <div class="middle-column">
        <p class="title-text">Welcome to your personal program space</p>
        <br/>
        <div class="form-workouts">
          <h2> Add a Workout </h2>
            <div class="input-row">
              <input type="text" v-model="newWorkoutName" placeholder="Workout Name" class="workout-input" />
              <input type="text" v-model="newStreetPark" placeholder="Street Park" class="workout-input" />
            </div>
            <input type="date" v-model="newWorkoutDate" placeholder="Workout Date" class="date-input" />
            <textarea v-model="newNotes" placeholder="Notes" class="notes-input"></textarea>
            <input type="number" min="1" max="10" v-model="newSatisfaction" placeholder="Satisfaction" class="satisfaction-input" />
            <button class="button_table_green" @click="addWorkoutLog">Add Workout</button>
            <br/>
        </div>
      </div>

      <div class="workout-logs">
        <h2> Your Workouts </h2>
        <table>
          <thead>
            <tr>
              <th>Workout Name</th>
              <th>Street Park</th>
              <th>Workout Date</th>
              <th>Notes</th>
              <th>Satisfaction</th>
              <th>Date / Time</th>
              <th class="button_col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(workoutLog, index) in workoutLogsArray" :key="index">
              <td data-label="Workout Name">
                <input type="text" v-model="workoutLog.workout_name" class="table_input" />
              </td>
              <td data-label="Street Park">
                <input type="text" v-model="workoutLog.street_park" class="table_input" />
              </td>
              <td data-label="Workout Date">
                <input type="date" v-model="workoutLog.workout_date" class="table_input" />
              </td>
              <td data-label="Notes">
                <input type="text" v-model="workoutLog.notes" class="table_input" />
              </td>
              <td data-label="Satisfaction">
                <input type="number" min="1" max="10" v-model="workoutLog.satisfaction" class="table_input" />
              </td>
              <td data-label="Datum / Zeit">{{ formatDate(workoutLog.created_at) }}</td>
              <td class="form-workouts">
                <button class="button_table_green" @click="updateWorkoutLog(workoutLog.id,
                                                                            workoutLog.workout_name,
                                                                            workoutLog.notes,
                                                                            workoutLog.street_park,
                                                                            workoutLog.workout_date,
                                                                            workoutLog.satisfaction)">Update</button>
                <button class="button_table_red" @click="deleteWorkoutLog(workoutLog.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </template>