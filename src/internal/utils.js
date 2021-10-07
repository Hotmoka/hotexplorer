import Vue from "vue";

export const EventBus = new Vue()

const showToast = (vue, title, message, type) => {
    vue.$bvToast.toast(message, {
        title: title,
        variant: type,
        solid: true,
        autoHideDelay: 6000,
        toaster: 'b-toaster-top-right'
    })
}

export const showInfoToast = (vue, title, message) => showToast(vue, title, message, 'info')

export const showSuccessToast = (vue, title, message) => showToast(vue, title, message, 'success')

export const showErrorToast = (vue, title, message) => showToast(vue, title, message, 'danger')

export const showErrorAlert = message => {
    EventBus.$emit('onErrorAlert', {
        message: message,
        show: true
    })
}

export const dismissErrorAlert = () => {
    EventBus.$emit('onErrorAlert', {
        message: '',
        show: false
    })
}

export const buildBreadcrumbAddress = rootAddress => {
    if (rootAddress) {
        let className = ''
        if (rootAddress.className && rootAddress.className.length > 0) {
            if (rootAddress.className.indexOf('.') !== -1) {
                className += ' (' + rootAddress.className.substring(rootAddress.className.lastIndexOf('.') + 1, rootAddress.className.length) + ')'
            } else {
                className += ' (' + rootAddress.className + ')'
            }
        }
        const address = rootAddress.object.transaction.hash + '#' + parseInt(rootAddress.object.progressive).toString(16)
        return {
            text: address + className,
            active: true,
            href: '#',
            id: address
        }
    }
    return null
}

/**
 * Helper method to wrap a promise task.
 * @param promiseTask the Promise task
 * @return {Promise<unknown>} a promise that resolves to the result of the promise task
 */
export const WrapPromiseTask = (promiseTask) => {
    return new Promise((resolve, reject) => {

        dismissErrorAlert()
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
