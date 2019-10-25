const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = require("selenium-webdriver").By;

let browser;

test.describe("Use-Case 1, Homepage", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://proj-react.emelieaslund.me/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test Homepage", function(done) {
        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "HUMMINGBIRD CREATIONS");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/"));
        });

        done();
    });

    test.it("Test go to Home", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("HEM")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "HUMMINGBIRD CREATIONS");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/"));
        });

        done();
    });
});

test.describe("Use-case 2, Homepage->Forms", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://proj-react.emelieaslund.me/forms/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test go from Homepage to Register Form", function(done) {
        // Use nav link to go to form page
        browser.findElement(By.linkText("REGISTRERING")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "REGISTRERA EN NY ANVÄNDARE");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/forms/"));
        });

        done();
    });
});

test.describe("Use-case 3, Register->Login", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://proj-react.emelieaslund.me/forms/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test Register Page", function(done) {
        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "REGISTRERA EN NY ANVÄNDARE");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/forms/"));
        });

        done();
    });

    test.it("Test go from Register Form to Login", function(done) {
        // Use nav link to go to form page
        browser.findElement(By.linkText("LOGGA IN")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "LOGGA IN");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/login/"));
        });

        done();
    });
});

// test.describe("Use-case 3, Hompage->Webbshop", function() {
//     test.beforeEach(function(done) {
//         this.timeout(20000);
//         browser = new webdriver.Builder()
//         .withCapabilities(webdriver.Capabilities.firefox()).build();
//         browser.get("https://proj-react.emelieaslund.me/login/");
//
//         done();
//     });
//
//     test.afterEach(function(done) {
//         browser.quit();
//         done();
//     });
//
//     test.it("Test to login", function(done) {
//         browser.findElement(webdriver.By.name("email")).sendKeys('test@test.test');
//         browser.findElement(webdriver.By.name("pass")).sendKeys('testing');
//         browser.findElement(webdriver.By.className("input-submit")).click();
//
//         browser.findElement(By.linkText("WEBBSHOP")).then(function(element) {
//             element.click();
//         });
//
//
//         // Check correct URL ending
//         browser.getCurrentUrl().then(function(url) {
//             assert.ok(url.endsWith("https://proj-react.emelieaslund.me/webbshop/"));
//         });
//         done();
//     });
// });

test.describe("Use-case 4, Hompage->Register->Login", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox()).build();
        browser.get("https://proj-react.emelieaslund.me/");

        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test to go to register then to login", function(done) {
        browser.findElement(By.linkText("REGISTRERING")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "REGISTRERA EN NY ANVÄNDARE");
            });
        });

        browser.findElement(By.linkText("LOGGA IN")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "LOGGA IN");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/login/"));
        });
        done();
    });
});

test.describe("Use-case 5, Login->Register->Login->Homepage", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox()).build();
        browser.get("https://proj-react.emelieaslund.me/login");

        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test to go to register then to login", function(done) {
        browser.findElement(By.linkText("REGISTRERING")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "REGISTRERA EN NY ANVÄNDARE");
            });
        });

        browser.findElement(By.linkText("LOGGA IN")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "LOGGA IN");
            });
        });

        browser.findElement(By.linkText("HEM")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "HUMMINGBIRD CREATIONS");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("https://proj-react.emelieaslund.me/"));
        });
        done();
    });
});
