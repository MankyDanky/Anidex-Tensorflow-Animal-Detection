import os
from icrawler.builtin import GoogleImageCrawler

def download_images(keywords, output_directory, limit=50):
    google_crawler = GoogleImageCrawler(storage={'root_dir': output_directory})
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2015, 1, 1), (2015, 12, 31))})
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2016, 1, 1), (2016, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2017, 1, 1), (2017, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2018, 1, 1), (2018, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2019, 1, 1), (2019, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2020, 1, 1), (2020, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2021, 1, 1), (2021, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2022, 1, 1), (2022, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2023, 1, 1), (2023, 12, 31))}, file_idx_offset='auto')
    google_crawler.crawl(keyword=keywords, max_num=limit, filters={'date': ((2024, 1, 1), (2024, 12, 31))}, file_idx_offset='auto')

if __name__ == "__main__":
    animals = ["cat", "dog", "elephant", "lion", "tiger", "bear", "bird", "fish", "horse", "shark", "whale", "dolphin", "snake", "pig", "cow", "spider", "rabbit", "deer", "monkey", "squirrel", "raccoon", "skunk", "goose", "duck"]
    output_dir = "dataset"

    for animal in animals:
        animal_dir = os.path.join(output_dir, animal)
        os.makedirs(animal_dir, exist_ok=True)
        download_images(animal, animal_dir, limit=20)