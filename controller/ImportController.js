const {
	Officers,
	Users,
	Peternaks,
	JenisHewans,
	Kandangs,
	Vaksins,
	Hewans,
	Inseminasis,
	Kelahirans,
	Pengobatans,
	Pkbs,
} = require("../models");
const fs = require("fs");
const { excel, allExcel } = require("../helpers/excel");
const { encrypt } = require("../helpers/bcrypt");

const importAllData = async (req, res) => {
	try {
		const all_data_excel = req.file.path;

		const excelDatas = await allExcel(all_data_excel);

		for (const { sheetName, data } of excelDatas) {
			switch (sheetName) {
				case "Petugas":
					for (const val of data) {
						const existingOfficer = await Officers.findOne({
							where: { nik_petugas: val["NIK Petugas"] },
						});

						if (!existingOfficer) {
							await Officers.create({
								pekerjaan_id: val["Pekerjaan Id"],
								nik_petugas: val["NIK Petugas"],
								nama_petugas: val["Nama Petugas"],
								no_telp: val["No Telp"],
								email: val["Email"],
								wilayah: val["Wilayah"],
							});

							const encryptedPassword = encrypt(val["NIK Petugas"]);

							await Users.create({
								role_id: 2,
								name: val["Nama Petugas"],
								email: `${val["Nama Petugas"]}@gmail.com`,
								username: val["NIK Petugas"],
								password: encryptedPassword,
								created_at: new Date(),
							});
						}
					}
					break;

				case "Peternak":
					for (const val of data) {
						const existingPeternak = await Peternaks.findOne({
							where: { nik_peternak: val["NIK Peternak"] },
						});

						if (!existingPeternak) {
							await Peternaks.create({
								petugas_id: val["Petugas Id"],
								nik_peternak: val["NIK Peternak"],
								nama_peternak: val["Nama Peternak"],
								provinsi: val["Provinsi"],
								kabupaten: val["Kabupaten"],
								kecamatan: val["Kecamatan"],
								desa: val["Desa"],
								lokasi: val["Lokasi"],
								tanggal_pendaftaran: val["Tanggal Pendaftaran"],
							});

							const encryptedPassword = encrypt(val["NIK Peternak"]);

							await Users.create({
								role_id: 3,
								name: val["Nama Peternak"],
								email: `${val["Nama Peternak"]}@gmail.com`,
								username: val["NIK Peternak"],
								password: encryptedPassword,
								created_at: new Date(),
							});
						}
					}
					break;

				case "Jenis Hewan":
					for (const val of data) {
						const existingJenisHewan = await JenisHewans.findOne({
							where: { jenis: val["Jenis"] },
						});

						if (!existingJenisHewan) {
							await JenisHewans.create({
								jenis: val["Jenis"],
								deskripsi: val["Deskripsi"],
							});
						}
					}
					break;

				case "Kandang":
					for (const val of data) {
						const existingKandang = await Kandangs.findOne({
							where: {
								peternak_id: val["Peternak Id"],
								nama_kandang: val["Nama Kandang"],
								jenis_kandang: val["Jenis Kandang"],
								luas: `${val["Luas"]} m2`,
								kapasitas: `${val["Kapasitas"]} ekor`,
								nilai_bangunan: `Rp. ${val["Nilai Bangunan"]}`,
								alamat: val["Alamat"],
								foto_kandang: val["Foto Kandang"],
								photo_type: val["Tipe Foto"],
							},
						});

						if (!existingKandang) {
							await Kandangs.create({
								peternak_id: val["Peternak Id"],
								jenis_hewan_id: val["Jenis Hewan Id"],
								nama_kandang: val["Nama Kandang"],
								jenis_kandang: val["Jenis Kandang"],
								luas: `${val["Luas"]} m2`,
								kapasitas: `${val["Kapasitas"]} ekor`,
								nilai_bangunan: `Rp. ${val["Nilai Bangunan"]}`,
								alamat: val["Alamat"],
								latitude: val["Latitude"],
								longitude: val["Longitude"],
								foto_kandang: val["Foto Kandang"],
								photo_type: val["Tipe Foto"],
							});
						}
					}
					break;

				case "Hewan":
					for (const val of data) {
						const existingHewan = await Hewans.findOne({
							where: {
								petugas_id: val["Petugas Id"],
								peternak_id: val["Peternak Id"],
								kandang_id: val["Kandang Id"],
								kode_eartag_nasional: val["Kode Eartag Nasional"],
								no_kartu_ternak: val["Nomor Kartu Ternak"],
								spesies: val["Spesies"],
								sex: val["Sex"],
								umur: `${val["Umur"]} tahun`,
								identifikasi_hewan: val["Identifikasi Hewan"],
								tanggal_terdaftar: val["Tanggal Terdaftar"],
								alamat: val["Alamat"],
								latitude: val["Latitude"],
								longitude: val["Longitude"],
								foto_hewan: val["Foto Hewan"],
								photo_type: val["Tipe Foto"],
							},
						});

						if (!existingHewan) {
							await Hewans.create({
								petugas_id: val["Petugas Id"],
								peternak_id: val["Peternak Id"],
								kandang_id: val["Kandang Id"],
								kode_eartag_nasional: val["Kode Eartag Nasional"],
								no_kartu_ternak: val["Nomor Kartu Ternak"],
								spesies: val["Spesies"],
								sex: val["Sex"],
								umur: val["Umur"],
								identifikasi_hewan: val["Identifikasi Hewan"],
								tanggal_terdaftar: val["Tanggal Terdaftar"],
								alamat: val["Alamat"],
								latitude: val["Latitude"],
								longitude: val["Longitude"],
								foto_hewan: val["Foto Hewan"],
								photo_type: val["Tipe Foto"],
							});
						}
					}
					break;

				case "Vaksin":
					for (const val of data) {
						const existingVaksin = await Vaksins.findOne({
							where: { peternak_id: val["Peternak Id"], hewan_id: val["Hewan Id"] },
						});

						if (!existingVaksin) {
							await Vaksins.create({
								peternak_id: val["Peternak Id"],
								hewan_id: val["Hewan Id"],
								petugas_id: val["Petugas Id"],
								nama_vaksin: val["Nama Vaksin"],
								jenis_vaksin: val["Jenis Vaksin"],
								tanggal_vaksin: val["Tanggal Vaksin"],
							});
						}
					}
					break;

				case "Inseminasi":
					for (const val of data) {
						const existingInseminasi = await Inseminasis.findOne({
							where: {
								peternak_id: val["Peternak Id"],
								hewan_id: val["Hewan Id"],
								petugas_id: val["Petugas Id"],
								produsen: val["Produsen"],
								ib: val["Ib"],
								id_pejantan: val["Id Pejantan"],
								bangsa_pejantan: val["Bangsa Pejantan"],
								id_pembuatan: val["Id Pembuatan"],
								tanggal_ib: val["Tanggal Ib"],
							},
						});

						if (!existingInseminasi) {
							await Inseminasis.create({
								peternak_id: val["Peternak Id"],
								hewan_id: val["Hewan Id"],
								petugas_id: val["Petugas Id"],
								produsen: val["Produsen"],
								ib: val["Ib"],
								id_pejantan: val["Id Pejantan"],
								bangsa_pejantan: val["Bangsa Pejantan"],
								id_pembuatan: val["Id Pembuatan"],
								tanggal_ib: val["Tanggal Ib"],
							});
						}
					}
					break;

				case "Kelahiran":
					for (const val of data) {
						const existingKelahiran = await Kelahirans.findOne({
							where: {
								peternak_id: val["Peternak Id"],
								hewan_id: val["Hewan Id"],
								petugas_id: val["Petugas Id"],
								inseminasi_id: val["Inseminasi Id"],
								kandang_id: val["Kandang Id"],
								tanggal_laporan: val["Tanggal Laporan"],
								tanggal_lahir: val["Tanggal Lahir"],
								eartag_anak: val["Eartag Anak"],
								spesies_anak: val["Spesies Anak"],
								jenis_kelamin_anak: val["Jenis Kelamin Anak"],
							},
						});

						if (!existingKelahiran) {
							await Kelahirans.create({
								peternak_id: val["Peternak Id"],
								hewan_id: val["Hewan Id"],
								petugas_id: val["Petugas Id"],
								inseminasi_id: val["Inseminasi Id"],
								kandang_id: val["Kandang Id"],
								tanggal_laporan: val["Tanggal Laporan"],
								tanggal_lahir: val["Tanggal Lahir"],
								eartag_anak: val["Eartag Anak"],
								spesies_anak: val["Spesies Anak"],
								jenis_kelamin_anak: val["Jenis Kelamin Anak"],
							});
						}
					}
					break;

				default:
					console.log(`Sheet "${sheetName}" tidak dikenali.`);
			}
		}

		fs.unlinkSync(all_data_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importPetugas = async (req, res) => {
	try {
		const petugas_excel = req.file.path;

		const excelData = await excel(petugas_excel);

		for (const val of excelData) {
			const existingOfficer = await Officers.findOne({
				where: { nik_petugas: val["NIK Petugas"] },
			});

			if (!existingOfficer) {
				await Officers.create({
					pekerjaan_id: val["Pekerjaan Id"],
					nik_petugas: val["NIK Petugas"],
					nama_petugas: val["Nama Petugas"],
					no_telp: val["No Telp"],
					email: val["Email"],
					wilayah: val["Wilayah"],
				});

				const encryptedPassword = encrypt(val["NIK Petugas"]);

				await Users.create({
					role_id: 2,
					name: val["Nama Petugas"],
					email: `${val["Nama Petugas"]}@gmail.com`,
					username: val["NIK Petugas"],
					password: encryptedPassword,
					created_at: new Date(),
				});
			}
		}

		fs.unlinkSync(petugas_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importPeternak = async (req, res) => {
	try {
		const peternak_excel = req.file.path;

		const excelData = await excel(peternak_excel);

		for (const val of excelData) {
			const existingPeternak = await Peternaks.findOne({
				where: { nik_peternak: val["NIK Peternak"] },
			});

			if (!existingPeternak) {
				await Peternaks.create({
					nik_peternak: val["NIK Peternak"],
					nama_peternak: val["Nama Peternak"],
					provinsi: val["Provinsi"],
					kabupaten: val["Kabupaten"],
					kecamatan: val["Kecamatan"],
					desa: val["Desa"],
					lokasi: val["Lokasi"],
					petugas_id: val["Petugas Id"],
					tanggal_pendaftaran: val["Tanggal Pendaftaran"],
				});

				const encryptedPassword = encrypt(val["NIK Peternak"]);

				await Users.create({
					role_id: 3,
					name: val["Nama Peternak"],
					email: `${val["Nama Peternak"]}@gmail.com`,
					username: val["NIK Peternak"],
					password: encryptedPassword,
					created_at: new Date(),
				});
			}
		}

		fs.unlinkSync(peternak_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importJenisHewan = async (req, res) => {
	try {
		const jenis_hewan_excel = req.file.path;

		const excelData = await excel(jenis_hewan_excel);

		for (const val of excelData) {
			const existingJenisHewan = await JenisHewans.findOne({
				where: { jenis: val["Jenis"] },
			});

			if (!existingJenisHewan) {
				await JenisHewans.create({
					jenis: val["Jenis"],
					deskripsi: val["Deskripsi"],
				});
			}
		}

		fs.unlinkSync(jenis_hewan_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importKandang = async (req, res) => {
	try {
		const kandang_excel = req.file.path;

		const excelData = await excel(kandang_excel);

		for (const val of excelData) {
			const existingKandang = await Kandangs.findOne({
				where: {
					peternak_id: val["Peternak Id"],
					jenis_hewan_id: val["Jenis Hewan Id"],
					nama_kandang: val["Nama Kandang"],
					jenis_kandang: val["Jenis Kandang"],
					luas: `${val["Luas"]} m2`,
					kapasitas: `${val["Kapasitas"]} ekor`,
					nilai_bangunan: `Rp. ${val["Nilai Bangunan"]}`,
					alamat: val["Alamat"],
					latitude: val["Latitude"],
					longitude: val["Longitude"],
					foto_kandang: val["Foto Kandang"],
					photo_type: val["Tipe Foto"],
				},
			});

			if (!existingKandang) {
				await Kandangs.create({
					peternak_id: val["Peternak Id"],
					jenis_hewan_id: val["Jenis Hewan Id"],
					nama_kandang: val["Nama Kandang"],
					jenis_kandang: val["Jenis Kandang"],
					luas: `${val["Luas"]} m2`,
					kapasitas: `${val["Kapasitas"]} ekor`,
					nilai_bangunan: `Rp. ${val["Nilai Bangunan"]}`,
					alamat: val["Alamat"],
					latitude: val["Latitude"],
					longitude: val["Longitude"],
					foto_kandang: val["Foto Kandang"],
					photo_type: val["Tipe Foto"],
				});
			}
		}

		fs.unlinkSync(kandang_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error,
		});
	}
};

const importHewan = async (req, res) => {
	try {
		const hewan_excel = req.file.path;

		const excelData = await excel(hewan_excel);

		for (const val of excelData) {
			const existingHewan = await Hewans.findOne({
				where: {
					petugas_id: val["Petugas Id"],
					peternak_id: val["Peternak Id"],
					kandang_id: val["Kandang Id"],
					kode_eartag_nasional: val["Kode Eartag Nasional"],
					no_kartu_ternak: val["Nomor Kartu Ternak"],
					spesies: val["Spesies"],
					sex: val["Sex"],
					umur: `${val["Umur"]} tahun`,
					identifikasi_hewan: val["Identifikasi Hewan"],
					tanggal_terdaftar: val["Tanggal Terdaftar"],
					alamat: val["Alamat"],
					latitude: val["Latitude"],
					longitude: val["Longitude"],
					foto_hewan: val["Foto Hewan"],
					photo_type: val["Tipe Foto"],
				},
			});

			if (!existingHewan) {
				await Hewans.create({
					petugas_id: val["Petugas Id"],
					peternak_id: val["Peternak Id"],
					kandang_id: val["Kandang Id"],
					kode_eartag_nasional: val["Kode Eartag Nasional"],
					no_kartu_ternak: val["Nomor Kartu Ternak"],
					spesies: val["Spesies"],
					sex: val["Sex"],
					umur: val["Umur"],
					identifikasi_hewan: val["Identifikasi Hewan"],
					tanggal_terdaftar: val["Tanggal Terdaftar"],
					alamat: val["Alamat"],
					latitude: val["Latitude"],
					longitude: val["Longitude"],
					foto_hewan: val["Foto Hewan"],
					photo_type: val["Tipe Foto"],
				});
			}
		}

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importVaksin = async (req, res) => {
	try {
		const vaksin_excel = req.file.path;

		const excelData = await excel(vaksin_excel);

		for (const val of excelData) {
			const existingVaksin = await Vaksins.findOne({
				where: { peternak_id: val["Peternak Id"], hewan_id: val["Hewan Id"] },
			});

			if (!existingVaksin) {
				await Vaksins.create({
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					nama_vaksin: val["Nama Vaksin"],
					jenis_vaksin: val["Jenis Vaksin"],
					tanggal_vaksin: val["Tanggal Vaksin"],
				});
			}
		}

		fs.unlinkSync(vaksin_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importInseminasi = async (req, res) => {
	try {
		const inseminasi_excel = req.file.path;

		const excelData = await excel(inseminasi_excel);

		for (const val of excelData) {
			const existingInseminasi = await Inseminasis.findOne({
				where: {
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					produsen: val["Produsen"],
					ib: val["Ib"],
					id_pejantan: val["Id Pejantan"],
					bangsa_pejantan: val["Bangsa Pejantan"],
					id_pembuatan: val["Id Pembuatan"],
					tanggal_ib: val["Tanggal Ib"],
				},
			});

			if (!existingInseminasi) {
				await Inseminasis.create({
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					produsen: val["Produsen"],
					ib: val["Ib"],
					id_pejantan: val["Id Pejantan"],
					bangsa_pejantan: val["Bangsa Pejantan"],
					id_pembuatan: val["Id Pembuatan"],
					tanggal_ib: val["Tanggal Ib"],
				});
			}
		}

		fs.unlinkSync(inseminasi_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importKelahiran = async (req, res) => {
	try {
		const kelahiran_excel = req.file.path;

		const excelData = await excel(kelahiran_excel);

		for (const val of excelData) {
			const existingKelahiran = await Kelahirans.findOne({
				where: {
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					inseminasi_id: val["Inseminasi Id"],
					kandang_id: val["Kandang Id"],
					tanggal_laporan: val["Tanggal Laporan"],
					tanggal_lahir: val["Tanggal Lahir"],
					eartag_anak: val["Eartag Anak"],
					spesies_anak: val["Spesies Anak"],
					jenis_kelamin_anak: val["Jenis Kelamin Anak"],
				},
			});

			if (!existingKelahiran) {
				await Kelahirans.create({
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					inseminasi_id: val["Inseminasi Id"],
					kandang_id: val["Kandang Id"],
					tanggal_laporan: val["Tanggal Laporan"],
					tanggal_lahir: val["Tanggal Lahir"],
					eartag_anak: val["Eartag Anak"],
					spesies_anak: val["Spesies Anak"],
					jenis_kelamin_anak: val["Jenis Kelamin Anak"],
				});
			}
		}

		fs.unlinkSync(inseminasi_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importPengobatan = async (req, res) => {
	try {
		const pengobatan_excel = req.file.path;

		const excelData = await excel(pengobatan_excel);

		for (const val of excelData) {
			const existingPengobatan = await Pengobatans.findOne({
				where: {
					petugas_id: val["Petugas Id"],
					tanggal_pengobatan: val["Tanggal Pengobatan"],
					tanggal_kasus: val["Tanggal Kasus"],
					nama_infrastruktur: val["Nama Infrastruktur"],
					lokasi: val["Lokasi"],
					dosis: val["Dosis"],
					sindrom: val["Sindrom"],
					diagnosa_banding: val["Diagnosa Banding"],
				},
			});

			if (!existingPengobatan) {
				await Pengobatans.create({
					petugas_id: val["Petugas Id"],
					tanggal_pengobatan: val["Tanggal Pengobatan"],
					tanggal_kasus: val["Tanggal Kasus"],
					nama_infrastruktur: val["Nama Infrastruktur"],
					lokasi: val["Lokasi"],
					dosis: val["Dosis"],
					sindrom: val["Sindrom"],
					diagnosa_banding: val["Diagnosa Banding"],
				});
			}
		}

		fs.unlinkSync(pengobatan_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

const importPkb = async (req, res) => {
	try {
		const pkb_excel = req.file.path;

		const excelData = await excel(pkb_excel);

		for (const val of excelData) {
			const existingPkb = await Pkbs.findOne({
				where: {
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					tanggal_pkb: val["Tanggal Pkb"],
					spesies: val["Spesies"],
					umur_kebuntingan: `${val["Umur Kebuntingan"]} bulan`,
				},
			});

			if (!existingPkb) {
				await Pkbs.create({
					peternak_id: val["Peternak Id"],
					hewan_id: val["Hewan Id"],
					petugas_id: val["Petugas Id"],
					tanggal_pkb: val["Tanggal Pkb"],
					spesies: val["Spesies"],
					umur_kebuntingan: `${val["Umur Kebuntingan"]} bulan`,
				});
			}
		}

		fs.unlinkSync(pkb_excel);

		res.status(200).json({
			statusCode: 200,
			content: [],
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			message: error.message,
		});
	}
};

module.exports = {
	importAllData,
	importPetugas,
	importPeternak,
	importJenisHewan,
	importKandang,
	importHewan,
	importVaksin,
	importInseminasi,
	importKelahiran,
	importPengobatan,
	importPkb,
};
