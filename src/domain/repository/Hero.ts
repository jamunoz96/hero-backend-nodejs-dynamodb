import { Hero, ModelHero, entity, put, get } from "../model/Hero";
import { dynamoclient } from '../../db/connection';

export default class HeroRepository {

    public static async create(request: Hero): Promise<Hero> {
        const parseHero = new ModelHero(request);
        return dynamoclient.put(parseHero)
            .promise()
            .then(() => parseHero.Item)
            .catch(() => false);
    }

    public static update(request: Hero): Promise<Hero> {
        return dynamoclient.update(put(request))
            .promise()
            .then((data: any) => data.Attributes)
            .catch((err: any) => false);

    }

    public static find(id: string | number): Promise<Hero | null> {
        return dynamoclient.get(get(id))
            .promise()
            .then((data: any) => data?.Item)
            .catch((err: any) => false);
    }

    public static get(): Promise<[Hero] | [any]> {
        return dynamoclient.scan(entity)
            .promise()
            .then((data: any) => data?.Items)
            .catch((err: any) => false);
    }

    public static delete(id: string | number): Promise<boolean> {
        return dynamoclient.delete(get(id))
            .promise()
            .then((data: any) => true)
            .catch((err: any) => false);
    }

}
