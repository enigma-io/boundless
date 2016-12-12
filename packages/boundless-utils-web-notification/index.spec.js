/* eslint no-unused-expressions:0 */
window.Notification = function test() {};
window.Notification.permission = '';
window.Notification.requestPermission = function mockRequestPermission() {};

// can't mock the API properly when using the `import` API, since it hoists the
// require calls to the top of the scope
const notifier = require('./index').default;
const errors = require('./index').errors;

import sinon from 'sinon';

describe('web notification utility', () => {
    const sandbox = sinon.sandbox.create();
    const baseConfig = {
        header: 'hi',
        body: 'ho',
    };

    afterEach(() => sandbox.restore());

    it('resolves for asked + permission granted', (done) => {
        sandbox.stub(window.Notification, 'permission', 'default');
        sandbox.stub(window.Notification, 'requestPermission', (cb) => cb('granted'));

        notifier(baseConfig).then(done);
    });

    it('rejects for asked + permission denied', (done) => {
        sandbox.stub(window.Notification, 'permission', 'default');
        sandbox.stub(window.Notification, 'requestPermission', (cb) => cb('denied'));

        notifier(baseConfig).catch((error) => {
            expect(error).toBe(errors.DISABLED);
            done();
        });
    });

    it('rejects for existing permission denied', (done) => {
        sandbox.stub(window.Notification, 'permission', 'denied');

        notifier(baseConfig).catch((error) => {
            expect(error).toBe(errors.DISABLED);
            done();
        });
    });

    describe('with existing granted permissions', () => {
        beforeEach(() => sandbox.stub(window.Notification, 'permission', 'granted'));

        it('creates a notification', (done) => {
            notifier(baseConfig).then(done);
        });

        it('rejects for a missing config', (done) => {
            notifier().catch((error) => {
                expect(error).toBe(errors.CONFIG_MISSING);
                done();
            });
        });

        it('rejects for a malformed config', (done) => {
            notifier('').catch((error) => {
                expect(error).toBe(errors.CONFIG_TYPE);
                done();
            });
        });

        it('rejects for a missing config.body', (done) => {
            notifier({header: ''}).catch((error) => {
                expect(error).toBe(errors.BODY_MISSING);
                done();
            });
        });

        it('rejects for a malformed config.body', (done) => {
            notifier({header: '', body: 1}).catch((error) => {
                expect(error).toBe(errors.BODY_TYPE);
                done();
            });
        });

        it('rejects for a missing config.header', (done) => {
            notifier({body: ''}).catch((error) => {
                expect(error).toBe(errors.HEADER_MISSING);
                done();
            });
        });

        it('rejects for a malformed config.header', (done) => {
            notifier({header: 1, body: ''}).catch((error) => {
                expect(error).toBe(errors.HEADER_TYPE);
                done();
            });
        });

        it('does not reject for a missing config.icon', (done) => {
            notifier(baseConfig).then(done);
        });

        it('rejects for a malformed config.icon', (done) => {
            notifier({header: '', body: '', icon: 1}).catch((error) => {
                expect(error).toBe(errors.ICON_TYPE);
                done();
            });
        });

        it('does not reject for a missing config.onClick', (done) => {
            notifier(baseConfig).then(done);
        });

        it('rejects for a malformed config.onClick', (done) => {
            notifier({header: '', body: '', onClick: 1}).catch((error) => {
                expect(error).toBe(errors.ONCLICK_TYPE);
                done();
            });
        });
    });
});
