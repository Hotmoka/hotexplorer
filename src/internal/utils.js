import Vue from "vue";

export const EventBus = new Vue()

/**
 * Helper method to wrap a promise task.
 * @param promiseTask the Promise task
 * @return {Promise<unknown>} a promise that resolves to the result of the promise task
 */
export const WrapPromiseTask = (promiseTask) => {
    return new Promise((resolve, reject) => {

        EventBus.$emit('showSpinner', true)
        Promise.resolve(promiseTask())
            .then(result => {
                EventBus.$emit('showSpinner', false)
                resolve(result)
            })
            .catch(err => {
                EventBus.$emit('showSpinner', false)
                reject(err)
            })
    })
}
