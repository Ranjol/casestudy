
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_securecheck_website():
    options = Options()
    options.binary_location = (
        r"C:\Users\shiva\AppData\Local\Google\Chrome\Application\chrome.exe"
    )
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=options)

    try:
        driver.get("http://localhost:32610")

        wait = WebDriverWait(driver, 15)
        wait.until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )

        assert "SecureCheck" in driver.title

        print("SecureCheck website test passed!")

    finally:
        driver.quit()
