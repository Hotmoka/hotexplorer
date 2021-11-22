import {WrapPromiseTask} from "@/internal/utils";
import {RemoteNode, StorageReferenceModel, TransactionReferenceModel} from "hotweb3";
import Vue from "vue";

export class Service extends Vue {

    /**
     * Retrieves the info of the remote node.
     * @callback an optional callback to be invoked after a successful response
     * @return {Promise<InfoModel>} a promise that resolves to an info model
     */
    getRemoteNodeInfo() {
        return WrapPromiseTask(async () => new RemoteNode(this.$network.get()).info())
    }

    /**
     * It retrieves the state of a hotmoka object by performing a search based on its address.
     * @param address the address of the object
     * @return {Promise<StateModel>} a promise that resolves to the state of the address
     */
    searchByAddress(address) {
       return WrapPromiseTask(async () => {

            if (!address || !StorageReferenceModel.isStorageReference(address)) {
                throw new Error('Invalid address')
            }

            const hash = address.split('#')[0]
            const progressive = address.split('#')[1]

            return new RemoteNode(this.$network.get()).getState(StorageReferenceModel.newStorageReference(hash, progressive))
        })
    }

    /**
     * It searches the transaction request and response.
     * @param transactionHash the transaction hash
     * @return {Promise<Object>} a promise that resolves to the request and response of the transaction
     */
    searchByTransaction(transactionHash) {
        return WrapPromiseTask(async () => {

            if (!transactionHash) {
                throw new Error('Invalid transaction reference')
            }

            if (transactionHash.length !== 64) {
                throw new Error('Invalid hash address length')
            }

            const remoteNode = new RemoteNode(this.$network.get())
            const request = await remoteNode.getRequestAt(new TransactionReferenceModel('local', transactionHash))
            const response = await remoteNode.getResponseAt(new TransactionReferenceModel('local', transactionHash))

            return { request, response }
        })
    }
}