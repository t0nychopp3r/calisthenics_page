<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')
/* Used to check if the user is signing up or logging in */
const isSignUp = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    if (error) {
      if (error.status === 400) {
        isSignUp.value = true
        alert('No account found. Please sign up.')
      } else {
        throw error
      }
    } else {
      alert('Login successful!')
    }
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const handleSignUp = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signUp({ email: email.value, password: password.value })
    if (error) throw error
    alert('Sign-up successful! Check your email to confirm your account.')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <form class="row flex-center flex" @submit.prevent="isSignUp ? handleSignUp() : handleLogin()">
    <div class="col-6 form-widget">
      <p class="description" v-if="!isSignUp">Sign in with your email and password below and start tracking your journey!</p>
      <p class="description" v-if="isSignUp">Sign up with your email and password below to create your account!</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Sign in'"
          :disabled="loading"
        />
      </div>
      <div v-if="!isSignUp">
        <button type="button" @click="isSignUp = true">Don't have an account? Sign up</button>
      </div>
      <div v-if="isSignUp">
        <button type="button" @click="isSignUp = false">Already have an account? Sign in</button>
      </div>
    </div>
  </form>
</template>

