
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_securecheck_website():
    driver = webdriver.Chrome()

    try:
        driver.get("http://localhost:32610")

        wait = WebDriverWait(driver, 10)

        wait.until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )

        assert "SecureCheck" in driver.title

        print("SecureCheck website test passed!")

    finally:
        driver.quit()
