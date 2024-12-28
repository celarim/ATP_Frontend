<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const login = async () => {
    const result = await userStore.login(email.value, password.value);
    console.log(result);
    //메인페이지로 보내기
    if (result) {
        router.go(-1);
    }
    email.value = '';
    password.value = '';
}

</script>

<template>
    <div id="layoutAuthentication" class="bg-primary">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div size="large" style="display: flex;justify-content: center;">
                            <div class="col-xl-10 col-lg-12">
                                <div class="main-card">
                                    <div class="card-body under">
                                        <div class="row justify-content-center">
                                            <div class="col-xl-8 col-lg-9">
                                                <form novalidate="" class="ng-untouched ng-pristine ng-invalid">
                                                    <div class="mb-3"><label for="emailInput"
                                                            class="text-gray-600 small">Email address</label>
                                                            <input id="emailInput" data-cy="emailInput"
                                                            type="email" aria-describedby="emailHelp"
                                                            formcontrolname="email" v-model="email"
                                                            class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">
                                                        <div class="invalid-feedback">Email required.
                                                        </div>
                                                    </div>

                                                    <div class="mb-3"><label for="passwordInput"
                                                            class="small text-gray-600">Password</label><input
                                                            id="passwordInput" data-cy="passwordInput" type="password"
                                                            formcontrolname="password" v-model="password"
                                                            class="input-control form-control-solid ng-untouched ng-pristine ng-invalid">
                                                        <div class="invalid-feedback">Password required.
                                                        </div><!----><!---->
                                                    </div>
                                                    <div class="mb-3">
                                                        <a routerlink="/auth/password-reset-request"
                                                            href="/auth/password-reset-request">Forgot
                                                            your password?</a>
                                                    </div>



                                                    <div class="mb-3 d-flex align-items-center justify-content-between">
                                                        <div class="form-check form-check-solid custom-checkbox">
                                                            <input id="checkInput" data-cy="checkInput" type="checkbox"
                                                                formcontrolname="checkbox"
                                                                class="form-check-input small ng-untouched ng-pristine ng-valid">
                                                                <label
                                                                for="checkInput" class="form-check-label">Remember password</label>
                                                        </div><button type="button" class="btn btn-primary" @click="login()">Login</button>
                                                    </div>
                                                </form>
                                                <p class="small pt-3">This
                                                    site is protected by reCAPTCHA and the Google
                                                    <a href="https://policies.google.com/privacy" target="_blank"
                                                        rel="noreferrer">Privacy Policy
                                                    </a>and <a href="https://policies.google.com/terms" target="_blank"
                                                        rel="noreferrer">Terms of
                                                        Service </a>apply.
                                                </p><!----><!---->
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="my-0">
                                    <div class="card-body px-5 py-4">
                                        <div class="small text-center">New user?
                                            <a routerlink="../register" href="/auth/register">Create an
                                                account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
@import './login.css';
</style>