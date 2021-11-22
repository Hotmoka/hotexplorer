export class NetworkHolder{

    constructor() {
        this.network_ = null
    }

    set(network) {
        this.network_ = network
    }

    get() {
        return this.network_
    }
}