jest.mock('@octokit/rest', () => jest.fn())
import store from '../../../src/stores/repositories'
import faker from 'faker'
import octokit from '@octokit/rest'
import { when } from 'mobx';

describe('repository store should', () => {
    const octokitMock = {
        authenticate: jest.fn(),
        activity: {
            getWatchedRepos: jest.fn()
        }
    }
    beforeEach(() => {
        octokit.mockImplementation(function (){return octokitMock})
    });
    test('sets token', async () => {
        let token = faker.random.uuid()
        store.updateToken(token)
        expect(store.token).toEqual(token)
    })

    test('fetch remote repos', async () => {
        let repositories = [{full_name: faker.random.uuid()}, {full_name: faker.random.uuid()}]
        octokitMock.activity.getWatchedRepos.mockReturnValue(repositories)
        store.token = faker.random.uuid()

        await store.fetchProjects()

        expect(octokitMock.authenticate).toBeCalledWith({ type: 'token', token: store.token })
        expect(octokitMock.activity.getWatchedRepos).toBeCalledWith({per_page: 100, page: 1})
        await when(() => JSON.stringify(store.repositories) === JSON.stringify(repositories))
        expect(store.repositories).toEqual(repositories)
    })
})
