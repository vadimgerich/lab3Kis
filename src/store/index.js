import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        messages: [],
        bugalts: [],
        searchString: "",
        formVisible: false,
        formBugalt: {},
        formNewMode: true
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredBugalts(state) {
            let result = state.bugalts;
            if (state.searchString)
                result = result.filter(bugalt =>
                    bugalt.pib.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setBugalts(state, bugalts) {
            state.bugalts = bugalts;
        },
        addBugalt(state, bugalt) {
            state.bugalts.push(bugalt);
        },
        removeBugalt(state, bugalt) {
            const index = state.bugalts.indexOf(bugalt);
            state.bugalts.splice(index, 1);
        },
        updateBugalt(state, bugalt) {
            const index = state.bugalts.findIndex(b => b._id == bugalt._id);
            Vue.set(state.bugalts, index, bugalt);
        },
        sortBugalts(state, field) {
            state.bugalts.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormBugalt(state) {
            Object.assign(state.formBugalt, {
                pib: "",
                posada: "",
                payment: 0,
                countOfChilds: 0,
                stage: 0
            });
        },
        setFormBugalt(state, bugalt) {
            state.formBugalt = bugalt;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getBugalts(context) {
            try {
                let resp = await axios.get("http://localhost:5000/bugalt");
                context.commit("setBugalts", resp.data);
                await context.dispatch("showMessageForTime", { message: "Персонал завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getBugaltById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/bugalt/${id}`);
                await context.dispatch("showMessageForTime", { message: "Персонал завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getBugaltsByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/bugalt", { params: query });
                context.commit("setBugalts", resp.data);
                await context.dispatch("showMessageForTime", { message: "Персонал завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postBugalt(context, bugalt) {
            try {
                let resp = await axios.post("http://localhost:5000/bugalt", bugalt);
                context.commit("addBugalt", resp.data);
                await context.dispatch("showMessageForTime", { message: "Персонал додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteBugalt(context, bugalt) {
            try {
                let resp = await axios.delete(`http://localhost:5000/bugalt/${bugalt._id}`);
                context.commit("removeBugalt", resp.data);
                await context.dispatch("showMessageForTime", { message: "Персонал вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchBugalt(context, bugalt) {
            try {
                let resp = await axios.patch(`http://localhost:5000/bugalt/${bugalt._id}`, bugalt);
                context.commit("updateBugalt", resp.data);
                await context.dispatch("showMessageForTime", { message: "Персонал оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, bugalt) {
            bugalt = await context.dispatch("getBugaltById", bugalt._id);
            context.commit("setFormBugalt", bugalt);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormBugalt");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
