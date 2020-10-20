/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    },
}
