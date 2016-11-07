export default ngModule => {
    describe(`kcd-hello`, () =>{
        beforeEach(window.module(ngModule.name));

        it(`should be equal to false`, () => {
            expect(false).to.be.false;
        });

        it(`should be equal to true`, () => {
            expect(false).to.be.false;
        });
    });
}