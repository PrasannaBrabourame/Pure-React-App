// Both Jest and Mocha can use chai

import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

const testCheckout = data => request(app)
    .post('/checkout')
    .set('Accept', 'application/json')
    .send(data);

describe('checkout', () => {
    it('default customer', (done) => {
        testCheckout({
            customer: 'default',
            items: ['classic', 'standout', 'premium'],
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.total).to.equal(987.97);
                done();
            });
    });

    it('unilever customer', (done) => {
        testCheckout({
            customer: 'unilever',
            items: ['classic', 'classic', 'classic', 'premium'],
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.total).to.equal(934.97);
                done();
            });
    });
    it('apple customer', (done) => {
        testCheckout({
            customer: 'apple',
            items: ['classic', 'standout', 'standout', 'premium'],
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.total).to.equal(1264.96);
                done();
            });
    });
    it('ford customer case1', (done) => {
        testCheckout({
            customer: 'ford',
            items: ['classic', 'classic', 'classic', 'classic','classic'],
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.total).to.equal(1079.96);
                done();
            });
    });
    it('ford customer case2', (done) => {
        testCheckout({
            customer: 'ford',
            items: ['classic', 'classic', 'classic', 'classic'],
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.total).to.equal(1079.96);
                done();
            });
    });
    it('ford customer case3', (done) => {
        testCheckout({
            customer: 'ford',
            items: ['premium', 'premium', 'premium'],
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.total).to.equal(1169.97);
                done();
            });
    });
    
    
});
