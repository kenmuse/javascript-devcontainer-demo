import { Console } from "console";
import { Request, Response } from "express";
import { stringify } from "querystring";
import { DefaultController } from "../../src/controllers/defaultController.mjs";
import { Counter } from "../../src/services/index.mjs";

describe("Verify DefaultController", () => {
    const originalEnv = process.env;
    const counter: Counter = {
        init: async () => true,
        increment: jest.fn(async () => { return 1; }),
        reset: jest.fn(async () => { })
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset the state of the counter impl. between tests
        process.env = { ...originalEnv }; // Copy the original environment
    });

    afterAll(() => {
        process.env = originalEnv; // Restore original environment
    });

    test("View should support environment variables", async () => {
        const request: Partial<Request> = {};
        const sendFn = jest.fn();
        const response: Partial<Response> = {
            send: sendFn
        };

        process.env.VIEW_TITLE = "Test Title";
        const controller = new DefaultController(counter as Counter);
        await controller.get(request as Request, response as Response);
        expect(sendFn.mock.calls.length).toBe(1);
        expect(sendFn.mock.calls[0][0]).toContain(process.env.VIEW_TITLE); // First parameter of first call should contain text
    });

    test("View should use default text without environment variables", async () => {
        const request: Partial<Request> = {};
        const sendFn = jest.fn();
        const response: Partial<Response> = {
            send: sendFn
        };

        const controller = new DefaultController(counter as Counter);
        await controller.get(request as Request, response as Response);
        expect(sendFn.mock.calls.length).toBe(1);
        const defaultValue = DefaultController['DEFAULT_TITLE'];
        expect(sendFn.mock.calls[0][0]).toContain(defaultValue);
    });

    test("Should increment the view count", async () => {
        const request: Partial<Request> = {};
        const response: Partial<Response> = {
            send: jest.fn()
        };

        const controller = new DefaultController(counter);
        controller.get(request as Request, response as Response);
        await expect(counter.increment).toHaveBeenCalledTimes(1);
    });

    test("Should reset the view count", async () => {
        const request: Partial<Request> = {};
        const response: Partial<Response> = {
            redirect: jest.fn(() => { })
        };

        let controller = new DefaultController(counter as Counter);
        await controller.reset(request as Request, response as Response);
        expect(counter.reset).toHaveBeenCalledTimes(1);
        expect(response.redirect).toHaveBeenCalled();
    });
});
