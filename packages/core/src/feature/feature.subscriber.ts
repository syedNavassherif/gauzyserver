import { gauzyToggleFeatures } from "@gauzy/config";
import { FeatureStatusEnum, FileStorageProviderEnum } from "@gauzy/contracts";
import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from "typeorm";
import { shuffle } from 'underscore';
import { FileStorage } from "./../core/file-storage";
import { Feature } from "./feature.entity";

@EventSubscriber()
export class FeatureSubscriber implements EntitySubscriberInterface<Feature> {

    /**
    * Indicates that this subscriber only listen to Feature events.
    */
    listenTo() {
        return Feature;
    }

    /**
     * Called after entity is loaded from the database.
     *
     * @param entity
     */
    afterLoad(entity: Feature, event?: LoadEvent<Feature>): void | Promise<any> {
        try {
            if (!entity.status) {
                entity.status = shuffle(Object.values(FeatureStatusEnum))[0];
            }

            if (gauzyToggleFeatures.hasOwnProperty(entity.code)) {
                entity.isEnabled = !!gauzyToggleFeatures[entity.code];
            } else {
                entity.isEnabled = true;
            }

            if (entity.image) {
                const store = new FileStorage()
                store.setProvider(FileStorageProviderEnum.LOCAL);
                entity.imageUrl = store.getProviderInstance().url(entity.image);
            }
        } catch (error) {
            console.log(error);
        }
    }
}