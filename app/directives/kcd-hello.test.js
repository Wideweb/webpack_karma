export default ngModule => {
    describe(`kcd-hello`, () =>{
        beforeEach(window.module(ngModule.name));

        it(`should test properly 1`, () => {
            expect(false).to.be.true;
        });

        it(`should test properly 3`, () => {
            expect(true).to.be.true;
        });

        it(`should test properly 4`, () => {
            expect(false).to.be.true;
        });

        it(`should test properly 2`, () => {
            expect(true).to.be.true;
        });
    });
}